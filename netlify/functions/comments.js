const fs = require("fs").promises
const path = require("path")

// Netlify Function to handle comments
exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  }

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  const commentsFilePath = path.join(process.cwd(), "data", "adopting-review", "comments.json")

  try {
    if (event.httpMethod === "GET") {
      // Get comments
      try {
        const data = await fs.readFile(commentsFilePath, "utf8")
        const commentsData = JSON.parse(data)

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(commentsData),
        }
      } catch (error) {
        // File doesn't exist, return empty structure
        const emptyData = {
          page: "adopting-review",
          lastUpdated: new Date().toISOString(),
          commentCount: 0,
          comments: [],
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(emptyData),
        }
      }
    }

    if (event.httpMethod === "POST") {
      // Add comment
      const { action, comment } = JSON.parse(event.body)

      if (action !== "add" || !comment) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: "Invalid request" }),
        }
      }

      // Load existing comments
      let commentsData
      try {
        const data = await fs.readFile(commentsFilePath, "utf8")
        commentsData = JSON.parse(data)
      } catch (error) {
        // File doesn't exist, create new structure
        commentsData = {
          page: "adopting-review",
          lastUpdated: new Date().toISOString(),
          commentCount: 0,
          comments: [],
        }
      }

      // Add new comment
      commentsData.comments.push(comment)
      commentsData.commentCount = commentsData.comments.length
      commentsData.lastUpdated = new Date().toISOString()

      // Ensure directory exists
      await fs.mkdir(path.dirname(commentsFilePath), { recursive: true })

      // Save updated comments
      await fs.writeFile(commentsFilePath, JSON.stringify(commentsData, null, 2))

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Comment added successfully",
          commentCount: commentsData.commentCount,
        }),
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: "Method not allowed" }),
    }
  } catch (error) {
    console.error("Function error:", error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
        details: error.message,
      }),
    }
  }
}
