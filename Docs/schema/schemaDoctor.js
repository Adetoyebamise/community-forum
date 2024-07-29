/**
 * @openapi
 * components:
 *  schemas:
 *      doctorSignUpInput:
 *          type: object
 *          required:
 *              - fullName
 *              - emailAddress
 *              - role
 *              - phoneNumber
 *              - password
 *              - confirmPassword
 *              - address
 *              - country
 *              - cityOrState
 *              - doctorImage
 *              - yearsOfExperience
 *              - bio
 *              - profileURL
 *              - yearsOfExperience
 *          properties:
 *              fullName:
 *                  type: string
 *                  default: Moyin Baderu
 *              emailAddress:
 *                  type: string
 *                  default: doctor@example.com
 *              password:
 *                  type: string
 *                  default: doctor123
 *              confirmPassword:
 *                  type: string
 *                  default: doctor123
 *              role:
 *                  type: string
 *                  enum: ["Paediatrician", "General Practitioner", "Dentist", "Lactationist", "Dermatologist", "Therapist", "Nutritionist"]
 *              phoneNumber:
 *                  type: string
 *                  default: 07078645612
 *              yearsOfExperience:
 *                  type: string
 *                  default: 0
 *              address:
 *                  type: string
 *                  default: 15 gbobalo street
 *              country:
 *                  type: string
 *                  default: Nigeria
 *              doctorImage: 
 *                  type: file
 *                  default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              cityOrState:
 *                  type: string
 *                  default: Lagos
 *              bio:
 *                  type: string
 *                  default: smart and Intelligence
 *      doctorSignUpResponse:
 *          type: object
 *          properties:
 *              fullName:
 *                  type: string
 *              emailAddress:
 *                  type: string
 *              role:
 *                  type: string
 *              password:
 *                  type: string
 *              confirmPassword:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              address:
 *                  type: string
 *              country:
 *                  type: string
 *              cityOrState:
 *                  type: string
 *              yearsOfExperience:
 *                  type: string
 *              doctorImage:
 *                  type: file
 *              bio: 
 *                  type: string
 *              profileURL:
 *                  type: file
 *              _id:
 *                  type: string
 *              
 *          example:
 *              fullName: Moyin Baderu
 *              emailAddress: doctor@example.com
 *              password: $2b$10$h3Ryb8Mpr7Gi.nPVCNQvve794UWp6xzdq70lcF.oU3w81uk4ufnGi
 *              confirmPassword: $2b$10$h3Ryb8Mpr7Gi.nPVCNQvve794UWp6xzdq70lcF.oU3w81uk4ufnGi
 *              phoneNumber: 07078645612
 *              yearsOfExperience: 0
 *              address: 15 gbobalo street
 *              country: Nigeria
 *              cityOrState: Lagos
 *              imageURL: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              bio: Intelligent and Loving
 *              profileURL: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              _id: 6226fb84fd0478fa0e2fc8b4
 *      doctorLoginInput:
 *          type: object
 *          properties:
 *              emailAddress:
 *                  type: string,
 *                  default: doctor@example.com
 *              password:
 *                  type: string
 *                  default: doctor
 *      doctorLoginResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string,
 *              doctorId:
 *                  type: string
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJh...
 *              doctorId: 6226fac9fd0478fa0e2fc8ae
 *      doctorLoginPasswordError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Invalid Email or Password, Please Try Again
 *              success: false
 *              statusCode: 401
 *      doctorForgotPasswordCodeInput:
 *          type: object
 *          properties:
 *              emailAddress:
 *                  type: string,
 *                  default: doctor@example.com
 *      doctorForgotPasswordCodeResponse:
 *          type: object
 *          properties:
 *              verificationCode:
 *                  type: string,
 *              doctorId:
 *                  type: string
 *          example:
 *              verificationCode: qA9xP
 *              doctorId: 6226fac9fd0478fa0e2fc8ae
 *      doctorForgotPasswordCodeError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Email is not availlable
 *              success: false
 *              statusCode: 401
 *      doctorForgotPasswordCodeValidationInput:
 *          type: object
 *          properties:
 *              verificationCode:
 *                  type: string,
 *                  default: qT4y6
 *      doctorForgotPasswordCodeValidationResponse:
 *          type: object
 *          properties:
 *              verificationCode:
 *                  type: string,
 *              doctorId:
 *                  type: string
 *          example:
 *              verificationCode: qT4y6
 *              doctorId: 6226fac9fd0478fa0e2fc8ae
 *      doctorForgotPasswordCodeValidationError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Verification Code/ Doctor is not availlable
 *              success: false
 *              statusCode: 401
 *      doctorForgotPasswordServiceInput:
 *          type: object
 *          properties:
 *              oldPassword:
 *                  type: string,
 *                  default: layide
 *              newPassword:
 *                  type: string,
 *                  default: bayode
 *              confirmNewPassword:
 *                  type: string,
 *                  default: bayode
 *      doctorForgotPasswordServiceResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string,
 *              doctorId:
 *                  type: string
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJh...
 *              doctorId: 6226fac9fd0478fa0e2fc8ae
 *      doctorForgotPasswordServiceError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: New Password and Confirm new password must match...
 *              success: false
 *              statusCode: 401
 *      doctorForgotPasswordInput:
 *          type: object
 *          properties:
 *              newPassword:
 *                  type: string,
 *                  default: bayode
 *              confirmPassword:
 *                  type: string,
 *                  default: bayode
 *      doctorForgotPasswordResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string,
 *              doctorId:
 *                  type: string
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJh...
 *              doctorId: 6226fac9fd0478fa0e2fc8ae
 *      doctorForgotPasswordError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: New Password and confirm Password should match
 *              success: false
 *              statusCode: 401
 *      doctorPostInput:
 *          type: object
 *          required:
 *              - content
 *              - postImage
 *              - doctorId
 *              - tags
 *              - title
 *          properties:
 *              content:
 *                  type: string
 *                  default: Baby not crying even while pinched
 *              postImage:
 *                  type: file
 *                  default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              doctorId:
 *                  type: string
 *                  default: 623c440f63420a42dc........
 *              tags:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              title:
 *                  type: string
 *                  default: Baby is stooling
 *              postAnonymously:
 *                  type: Boolean
 *                  default: false
 *              shares:
 *                  type: Array
 *              likes:
 *                  type: Array
 *                  default: []
 *              comments:
 *                  type: Array
 *                  default: []
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: false
 *              reportPost:
 *                  type: Array
 *      doctorPostResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              tags:
 *                  type: string
 *              postImage:
 *                  type: file
 *              doctorId:
 *                  type: string
 *                  default: Baby is stooling
 *              postAnonymously:
 *                  type: Boolean
 *                  default: false
 *              shares:
 *                  type: Array
 *              likes:
 *                  type: Array
 *                  default: []
 *              comments:
 *                  type: Array
 *                  default: []
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: false
 *              reportPost:
 *                  type: Array
 *          example:
 *              _id: 6226fb84fd0478fa0e2fc8b4
 *              doctorId: "623c440f23440a42da....."
 *              title: Baby is Stooling
 *              content: get her flagyl
 *              tags: {_id: 6213ef5c98bdb0f4fbd...., tagName: Stooling}
 *              imageUrl: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *      doctorPostError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Something went wrong, Post not created
 *              success: false
 *              statusCode: 401
 *      doctorMedicalLicenseInput:
 *          type: object
 *          required:
 *             -profileImage
 *          properties:
 *              profileImage: 
 *                 type: file
 *                 default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *      doctorMedicalLicenseResponse:
 *          type: object
 *          properties:
 *              data:
 *                  type: string
 *          example:
 *                data: {
 *                 "acknowledged": true,
 *                 "modifiedCount": 1,
 *                 "upsertedId": null,
 *                 "upsertedCount": 0,
 *                 "matchedCount": 1
 *               }
 *      doctorMedicalLicenseError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Something went wrong, upload not succesful
 *              success: false
 *              statusCode: 401
 *      doctorValidCardInput:
 *          type: object
 *          required:
 *             -profileImage
 *          properties:
 *              cardImage: 
 *                 type: file
 *                 default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *      doctorValidCardResponse:
 *          type: object
 *          properties:
 *              data:
 *                  type: string
 *          example:
 *                data: {
 *                 "acknowledged": true,
 *                 "modifiedCount": 1,
 *                 "upsertedId": null,
 *                 "upsertedCount": 0,
 *                 "matchedCount": 1
 *               }
 *      doctorValidCardError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Something went wrong, upload not succesful
 *              success: false
 *              statusCode: 401
 *      doctorPostUpdateInput:
 *          properties:
 *              content:
 *                  type: string
 *                  default: Baby not crying even while pinched
 *              postImage:
 *                  type: file
 *                  default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              tags:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              title:
 *                  type: string
 *                  default: Baby is stooling
 *              postAnonymously:
 *                  type: Boolean
 *                  default: false
 *              shares:
 *                  type: Array
 *              likes:
 *                  type: Array
 *                  default: []
 *              comments:
 *                  type: Array
 *                  default: []
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: false
 *              reportPost:
 *                  type: Array
 *      doctorPostUpdateResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              tags:
 *                  type: string
 *              postImage:
 *                  type: file
 *              postAnonymously:
 *                  type: Boolean
 *                  default: false
 *              shares:
 *                  type: Array
 *              likes:
 *                  type: Array
 *                  default: []
 *              comments:
 *                  type: Array
 *                  default: []
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: false
 *              reportPost:
 *                  type: Array
 *          example:
 *              _id: 6226fb84fd0478fa0e2fc8b4
 *              doctorId: "623c440f23440a42da....."
 *              title: Baby is Stooling
 *              content: get her flagyl
 *              tags: {_id: 6213ef5c98bdb0f4fbd...., tagName: Stooling}
 *              imageUrl: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *      doctorPostUpdateError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred, Post not updated
 *              success: false
 *              statusCode: 401
 *      doctorlikedInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorlikedInputResponse:
 *          type: object
 *          properties:
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *          example:
 *              doctorId: 6226fb84fd0478fa0e2fc8b4
 *              postId: "623c440f23440a42da....."
 *      doctorlikedInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorCommentPostInput:
 *          properties:
 *              _id:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              comments:
 *                  type: Array
 *                  default: I love you baby
 *      doctorCommentPostInputResponse:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *              comments:
 *                  type: Array
 *          example:
 *              doctorId: 6226fb84fd0478fa0e2fc8b4
 *              postId: "623c440f23440a42da....."
 *              comments: I love backend with sliced frontend
 *      doctorCommentPostInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorCommentPostReplyInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              commentId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              reply:
 *                  type: string
 *                  default: You welcome
 *      doctorCommentPostReplyInputResponse:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *              commentId:
 *                  type: string
 *              reply:
 *                  type: string
 *          example:
 *              doctorId: 6226fb84fd0478fa0e2fc8b4
 *              postId: "623c440f23440a42da....."
 *              comments: I love backend with sliced frontend
 *      doctorCommentPostReplyInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorPostShareInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorPostShareInputResponse:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *          example:
 *              doctorId: 6226fb84fd0478fa0e2fc8b4
 *              postId: "623c440f23440a42da....."
 *      doctorPostShareInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorReportPostInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              reportPost:
 *                  type: string
 *                  default: Abusive language
 *      doctorReportPostInputResponse:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *              reportPost:
 *                  type: string
 *          example:
 *              _id: 6226fb84fd0478fa0e2fc8b4
 *              doctorId: 6226fb84fd0478fa0e2fc8b4
 *              postId: "623c440f23440a42da....."
 *              reportPost: Abusive language
 *      doctorReportPostInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorCreateAvailabilityInput:
 *          properties:
 *              availability:
 *                  type: Array 
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorCreateAvailabilityInputResponse:
 *          type: object
 *          properties:
 *              doctorId:
 *                  type: string
 *              avaiability:
 *                  type: Array
 *         
 *      doctorCreateAvailabilityInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorUpdateAvailabilityInput:
 *          properties:
 *              time:
 *                  type: Array 
 *              availabilityId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorUpdateAvailabilityInputResponse:
 *          type: object
 *          properties:
 *              time:
 *                  type: Array
 *              avaiabilityId:
 *                  type: string
 *         
 *      doctorUpdateAvailabilityInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorUpdateSavedPostInput:
 *          properties:
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: true
 *      doctorUpdateSavedPostInputResponse:
 *          type: object
 *          properties:
 *              is_SavedPosts:
 *                  type: Boolean
 *                  default: true
 *         
 *      doctorUpdateSavedPostInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorPostCommentLikedInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              commentId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorPostCommentLikedInputResponse:
 *          type: object
 *          properties:
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *              commentId:
 *                  type: string
 *          example:
 *             "data": {
 *               "acknowledged": true,
 *               "modifiedCount": 1,
 *               "upsertedId": null,
 *               "upsertedCount": 0,
 *               "matchedCount": 1  
 *                  }
 *      doctorPostCommentLikedInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 *      doctorPostCommentunlikedInput:
 *          properties:
 *              postId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              doctorId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *              commentId:
 *                  type: string
 *                  default: 623c440f23440a42da........
 *      doctorPostCommentunlikedInputResponse:
 *          type: object
 *          properties:
 *              doctorId:
 *                  type: string
 *              postId:
 *                  type: string
 *              commentId:
 *                  type: string
 *          example:
 *             "data": {
 *               "acknowledged": true,
 *               "modifiedCount": 1,
 *               "upsertedId": null,
 *               "upsertedCount": 0,
 *               "matchedCount": 1  
 *                  }
 *      doctorPostCommentunlikedInputError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Oops, an error occurred
 *              success: false
 *              statusCode: 401
 */

 


 