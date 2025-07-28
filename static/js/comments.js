
// Enhanced comment functionality
class CommentSystem {
  constructor() {
    this.comments = [];
    this.currentUser = {
      name: "currentuser",
      avatar: "/images/default-avatar.svg"
    };
  }
  
  init() {
    this.loadComments();
    this.bindEvents();
  }
  
  loadComments() {
    // Load from localStorage or API
    const saved = localStorage.getItem('hugo-comments');
    if (saved) {
      this.comments = JSON.parse(saved);
    }
    this.render();
  }
  
  saveComments() {
    localStorage.setItem('hugo-comments', JSON.stringify(this.comments));
  }
  
  addComment(content) {
    const comment = {
      id: Date.now(),
      author: this.currentUser.name,
      avatar: this.currentUser.avatar,
      content: content,
      timestamp: this.formatTimestamp(new Date()),
      commentNumber: this.getNextCommentNumber()
    };
    
    this.comments.push(comment);
    this.saveComments();
    this.render();
  }
  
  formatTimestamp(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  getNextCommentNumber() {
    return this.comments.length > 0 
      ? Math.max(...this.comments.map(c => c.commentNumber)) + 1 
      : 1;
  }
  
  render() {
    // Render logic here
  }
  
  bindEvents() {
    // Event binding logic here
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const commentSystem = new CommentSystem();
  commentSystem.init();
});
