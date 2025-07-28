// Ad Comments Backend System
class AdCommentSystem {
  constructor() {
    this.comments = []
    this.apiEndpoint = "/.netlify/functions/comments" // Netlify Functions endpoint
    this.dataFile = "/data/adopting-review/comments.json"
    this.isLoading = false
  }

  async init() {
    await this.loadComments()
    this.bindEvents()
    this.render()
  }

  async loadComments() {
    try {
      this.showLoading(true)

      // Try to fetch from API first
      const response = await fetch(`${this.apiEndpoint}?action=get`)

      if (response.ok) {
        const data = await response.json()
        this.comments = data.comments || []
        console.log("Comments loaded from server:", this.comments.length)
      } else {
        // Fallback to Hugo data file
        await this.loadFromHugoData()
      }
    } catch (error) {
      console.log("API not available, trying Hugo data file...")
      await this.loadFromHugoData()
    } finally {
      this.showLoading(false)
    }
  }

  async loadFromHugoData() {
    try {
      // Try to load from Hugo's data file
      const response = await fetch(this.dataFile)
      if (response.ok) {
        const data = await response.json()
        this.comments = data.comments || []
        console.log("Comments loaded from Hugo data:", this.comments.length)
      }
    } catch (error) {
      console.log("No existing comments found, starting fresh")
      this.comments = []
    }
  }

  async saveComment(comment) {
    try {
      this.showLoading(true)

      // Try to save via API
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          comment: comment,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Add to local array for immediate display
          this.comments.push(comment)
          this.showStatus("Comment added successfully!", "success")
          return { success: true }
        } else {
          throw new Error(result.error || "Failed to save comment")
        }
      } else {
        throw new Error("Server error")
      }
    } catch (error) {
      console.error("Error saving comment:", error)

      // Fallback: save to localStorage and show instructions
      this.saveToLocalStorage(comment)
      this.showStatus("Comment saved locally. Please refresh to see all comments.", "error")
      return { success: false, error: error.message }
    } finally {
      this.showLoading(false)
    }
  }

  saveToLocalStorage(comment) {
    // Add to local array
    this.comments.push(comment)

    // Save to localStorage as backup
    const backupData = {
      page: "adopting-review",
      lastUpdated: new Date().toISOString(),
      commentCount: this.comments.length,
      comments: this.comments,
    }

    localStorage.setItem("ad-comments-backup", JSON.stringify(backupData))

    // Show manual instructions
    console.log("Please manually add this comment to data/adopting-review/comments.json:")
    console.log(JSON.stringify(backupData, null, 2))
  }

  async addComment() {
    const nameInput = document.getElementById("userName")
    const emailInput = document.getElementById("userEmail")
    const textarea = document.getElementById("newCommentText")

    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const content = textarea.value.trim()

    // Validation
    if (!name || !email || !content) {
      this.showStatus("Please fill in all fields.", "error")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showStatus("Please enter a valid email address.", "error")
      return
    }

    // Create comment object
    const comment = {
      id: Date.now(),
      author: name,
      email: email,
      content: content,
      timestamp: this.formatTimestamp(new Date()),
      date: new Date().toISOString(),
      commentNumber: this.getNextCommentNumber(),
      avatar: this.generateAvatar(name),
    }

    // Save comment
    const result = await this.saveComment(comment)

    if (result.success) {
      this.render()

      // Clear form
      nameInput.value = ""
      emailInput.value = ""
      textarea.value = ""

      // Save user info for next time
      localStorage.setItem(
        "ad-comment-user",
        JSON.stringify({
          name: name,
          email: email,
        }),
      )
    }
  }

  async getClientIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      return data.ip
    } catch (error) {
      return "unknown"
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  generateAvatar(name) {
    const encodedName = encodeURIComponent(name)
    return `https://ui-avatars.com/api/?name=${encodedName}&background=3B82F6&color=fff&size=40&rounded=true`
  }

  formatTimestamp(date) {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`

    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`

    const months = Math.floor(days / 30)
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`

    const years = Math.floor(months / 12)
    return `${years} year${years > 1 ? "s" : ""} ago`
  }

  getNextCommentNumber() {
    return this.comments.length > 0 ? Math.max(...this.comments.map((c) => c.commentNumber || 0)) + 1 : 1
  }

  createCommentHTML(comment) {
    return `
      <div class="comment-card" data-comment-id="${comment.id}">
        <div class="comment-content">
          <div class="comment-number">
            <span>${comment.commentNumber}</span>
          </div>
          <div class="comment-avatar">
            <img src="${comment.avatar}" alt="${comment.author}" class="avatar" 
                 onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=gray&color=fff&size=40'">
          </div>
          <div class="comment-body">
            <div class="comment-header">
              <div class="comment-meta">
                <span class="comment-author">${this.escapeHtml(comment.author)}</span>
                <span class="comment-timestamp">${comment.timestamp}</span>
              </div>
              <button class="reply-button" onclick="window.adComments.handleReply(${comment.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,17 4,12 9,7"></polyline>
                  <path d="M20,18v-2a4,4 0 0,0-4-4H4"></path>
                </svg>
                Reply
              </button>
            </div>
            <p class="comment-text">${this.escapeHtml(comment.content)}</p>
          </div>
        </div>
      </div>
    `
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  render() {
    const commentsList = document.getElementById("commentsList")
    if (!commentsList) return

    if (this.comments.length === 0) {
      commentsList.innerHTML = `
        <div class="comment-card">
          <div class="comment-content">
            <p class="no-comments">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        </div>
      `
      return
    }

    // Sort comments by comment number (newest first)
    const sortedComments = [...this.comments].sort((a, b) => (b.commentNumber || 0) - (a.commentNumber || 0))
    commentsList.innerHTML = sortedComments.map((comment) => this.createCommentHTML(comment)).join("")
  }

  handleReply(commentId) {
    const comment = this.comments.find((c) => c.id === commentId)
    if (comment) {
      const textarea = document.getElementById("newCommentText")
      textarea.value = `@${comment.author} `
      textarea.focus()
      textarea.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  showStatus(message, type) {
    const statusContainer = document.getElementById("statusContainer")
    if (!statusContainer) return

    statusContainer.innerHTML = ""

    const statusDiv = document.createElement("div")
    statusDiv.className = `status-message status-${type}`
    statusDiv.textContent = message

    statusContainer.appendChild(statusDiv)

    setTimeout(() => {
      if (statusDiv.parentNode) {
        statusDiv.remove()
      }
    }, 5000)
  }

  showLoading(isLoading) {
    this.isLoading = isLoading
    const commentSection = document.querySelector(".comment-section")
    const sendButton = document.getElementById("sendComment")

    if (commentSection) {
      commentSection.classList.toggle("loading", isLoading)
    }

    if (sendButton) {
      sendButton.disabled = isLoading
      sendButton.innerHTML = isLoading
        ? "<span>Saving...</span>"
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <line x1="22" y1="2" x2="11" y2="13"></line>
             <polygon points="22,2 15,22 11,13 2,9"></polygon>
           </svg>
           SEND`
    }
  }

  bindEvents() {
    const sendButton = document.getElementById("sendComment")
    const textarea = document.getElementById("newCommentText")

    if (sendButton) {
      sendButton.addEventListener("click", () => this.addComment())
    }

    if (textarea) {
      // Allow Enter + Ctrl/Cmd to submit
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault()
          this.addComment()
        }
      })
    }

    // Load saved user info
    this.loadUserInfo()
  }

  loadUserInfo() {
    const savedUser = localStorage.getItem("ad-comment-user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        const nameInput = document.getElementById("userName")
        const emailInput = document.getElementById("userEmail")

        if (nameInput && userData.name) nameInput.value = userData.name
        if (emailInput && userData.email) emailInput.value = userData.email
      } catch (error) {
        console.log("Error loading saved user info:", error)
      }
    }
  }

  // Method to manually load comments from JSON file
  async loadFromJSON(jsonData) {
    try {
      if (typeof jsonData === "string") {
        jsonData = JSON.parse(jsonData)
      }

      this.comments = jsonData.comments || []
      this.render()
      this.showStatus("Comments loaded successfully!", "success")
    } catch (error) {
      this.showStatus("Error loading comments from JSON.", "error")
      console.error("JSON load error:", error)
    }
  }
}

// Export for global access
window.AdCommentSystem = AdCommentSystem
