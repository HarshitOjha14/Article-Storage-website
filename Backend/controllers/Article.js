const Article = require("../models/Article");
const Department = require("../models/Department");
const user = require("../models/user")







exports.createArticle = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the request (e.g., from JWT)

    const {
      title,
      authors,
      type,
      journalName,
      volume,
      location,
      issue,
      pageNoStart,
      pageNoEnd,
      conferenceName,
      month,
      year,
      link,
    } = req.body;

    // Validate required fields
    if (!title || !authors || !type) {
      return res.status(400).json({
        success: false,
        message: "Title, Authors, and Type are mandatory fields",
      });
    }

    // Validate type-specific fields
    if (type === "Journal" && !journalName) {
      return res.status(400).json({
        success: false,
        message: "Journal name is required for journal articles",
      });
    }

    if (type === "Conference" && !conferenceName) {
      return res.status(400).json({
        success: false,
        message: "Conference name is required for conference articles",
      });
    }

    // Fetch user details to get department ID
    const publisherDetails = await user.findById(userId);

    if (!publisherDetails) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    // Extract department ID from user details
    const deptID = publisherDetails.department;

    // Create the new article
    const newArticle = await Article.create({
      title,
      authors,
      type,
      journalName,
      volume,
      location,
      issue,
      pageNoStart,
      pageNoEnd,
      conferenceName,
      month,
      year,
      link,
      publisher: userId,
      department: deptID, 
    });

    // Update user's articles array
    await user.findByIdAndUpdate(userId, { $push: { articles: newArticle._id } });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create article",
      error: error.message,
    });
  }
};




exports.editArticle = async (req, res) => {
    try {
        const { ArticleId } = req.body
        const updates = req.body
        const article = await Article.findById(ArticleId)

        if (!article) {
            return res.status(404).json({ error: "Article not found" })
        }


        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {

                article[key] = updates[key]

            }
        }

        await article.save()

        const updatedArticle = await Article.findOne({
            _id: ArticleId,
        })
            .populate({
                path: "Author",
                populate: {
                    path: "additionalDetails",
                },
            })


            .exec()

        res.json({
            success: true,
            message: "Article updated successfully",
            data: updatedArticle,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}


// Get Course List
exports.getAllArticles = async (req, res) => {
    try {
        const allArticles = await Article.find().populate("publisher").exec()

        return res.status(200).json({
            success: true,
            data: allArticles,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Article Data`,
            error: error.message,
        })
    }
}

exports.getRecentArticles = async(req,res)=>{
    try {
        // Fetch articles sorted by createdAt in descending order
        const articles = await Article.find().populate("Author").sort({ createdAt: -1 }).exec();
        res.status(200).json({
          success: true,
          data: articles,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error fetching recent articles',
          error: error.message,
        });
    }
}


exports.deleteArticle = async (req, res) => {
    try {
        const { ArticleId } = req.body;
        console.log("ye ekh ek baar ", ArticleId)
        const userId = req.user.id;

        // Find the Article
        const article = await Article.findById(ArticleId);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found arha h " });
        }

        // Remove the reference to the article from the user's articles array
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { $pull: { articles: ArticleId } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // console.log("User after article removal:", updatedUser);

        // Delete the article
        await Article.findByIdAndDelete(ArticleId);

        return res.status(200).json({
            success: true,
            message: "Article deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


exports.getArticleDetails = async (req, res) => {
    try {
      const { articleId } = req.body;

    //   console.log("hello ji " , articleId)
  
      // Fetch the article details by ID and populate the Author field
      const articleDetails = await Article.findOne({ _id: articleId }).populate("publisher");
  
      // Check if the article was found
      if (!articleDetails) {
        return res.status(404).json({
          success: false,
          message: `Could not find article with id: ${articleId}`,
        });
      }
  
      // Respond with article details
      return res.status(200).json({
        success: true,
        data: {
          articleDetails,
        },
      });
    } catch (error) {
      // Handle server errors
      return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  };



exports.getAuthorDetails = async (req, res) => {

    try {
        //get id 
        const {authorId} = req.body;
        console.log("ye hai author ki id" , authorId)

        //validation and get User details
        const userDetails = await user.findById(authorId).populate("additionalDetails").populate("articles").exec();


        //return response 

        return res.status(200).json({
            success: true,
            message: 'Author data fetched successfully',
            data:userDetails
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
  

exports.searchArticles = async (req, res) => {
  try {
    const { departmentId, facultyId, fromDate, toDate, type } = req.body;
    // console.log("ye dekhlo smajh ajayega ,",departmentId, facultyId, fromDate, toDate, type )

    // Build MongoDB query filters dynamically
    const query = {};

    // Filter by date range if provided
    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate), // Start of range
        $lte: new Date(toDate),   // End of range
      };
    }

    // Filter by article type if provided
    if (type) {
      query.type = type;
    }

    // If departmentId is provided, validate and fetch department details
    if (departmentId) {
      const department = await Department.findById(departmentId).populate("faculty");

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      // If facultyId is provided, validate it belongs to the department
      if (facultyId) {
        if (!department.faculty.some(faculty => faculty._id.toString() === facultyId)) {
          return res.status(400).json({ message: "Faculty does not belong to the selected department" });
        }
        query.publisher = facultyId; // Filter by faculty
      } else {
        // If only departmentId is provided, limit to articles from department faculty
        query.publisher = { $in: department.faculty.map(faculty => faculty._id) };
      }
    } else if (facultyId) {
      // If only facultyId is provided without departmentId, filter by faculty
      query.publisher = facultyId;
    }

    // Execute the query
    const articles = await Article.find(query)
      .populate("publisher", "Name") // Populate publisher with the Name field
      .sort({ createdAt: -1 });      // Sort by createdAt in descending order

    // Respond with articles
    return res.status(200).json({ articles });
  } catch (error) {
    console.error("Error searching articles:", error);
    return res.status(500).json({ message: "Failed to fetch articles" });
  }
};



