/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/register-doctor':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Create a Doctor Account
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorSignUpInput'
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/doctorSignUpInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorSignUpResponse'
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/login-doctor':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor login
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorLoginInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorLoginResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorLoginPasswordError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/profile/{doctorId}':
 *      put:
 *          tags:
 *              - Doctor 
 *          summary: update doctor profile
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorUpdateInput'
 *                  multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/doctorUpdateInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  success:
 *                                      type: boolean
 *                                  statusCode:
 *                                      type: integer
 *                          example:
 *                              message: 'Profile Successfully Updated'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/code-input':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor forgotpasswordcode generation
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorForgotPasswordCodeInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordCodeResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordCodeError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/verify-code':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor forgotpasswordcode Validation
 *     parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorForgotPasswordCodeValidationInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordCodeValidationResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordCodeValidationError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/doctor-profile-updatepassword/{doctorId}':
 *      put:
 *          tags:
 *              - Doctor 
 *          summary: update doctor profile Password
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordServiceInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  success:
 *                                      type: boolean
 *                                  statusCode:
 *                                      type: integer
 *                          example:
 *                              message: 'Doctor Password Successfully updated'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/doctor/forgot-password/{doctorId}':
 *      put:
 *          tags:
 *              - Doctor 
 *          summary: Update Doctor forgot Password
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorForgotPasswordInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  success:
 *                                      type: boolean
 *                                  statusCode:
 *                                      type: integer
 *                          example:
 *                              message: 'Doctor Password Successfully updated'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/doctor-post':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor Post creation
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorPostInput'
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/doctorPostInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/posts?doctorId=value':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get all doctor posts
 *          parameters:
 *              -   name: doctorId
 *                  in: query
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *                  example:
 *                      doctorId: 61fb13fd283f92a5438c65e2
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/post/{doctorId}/{postId}':
 *      put:
 *          tags:
 *              - Doctor
 *          summary: Updating doctor posts
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
  *              -   name: postId
 *                  in: path
 *                  description: mongo object _id of the doctor posts document to be updated
 *                  required: true
 *          requestBody:
 *              content:
 *                application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/doctorPostUpdateInput'
 *                multipart/form-data:
 *                 schema:
 *                     $ref: '#/components/schemas/doctorPostUpdateInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostUpdateInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/post/{doctorId}/{postId}':
 *      delete:
 *          tags:
 *              - Doctor
 *          summary: Deleting doctor posts
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
  *              -   name: postId
 *                  in: path
 *                  description: mongo object _id of the doctor posts document to be updated
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
  *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  success:
 *                                      type: boolean
 *                                  statusCode:
 *                                      type: integer
 *                          example:
 *                              message: 'Doctors post successfully deleted'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/post-like':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor Post liked
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorlikedInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorlikedInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorlikedInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/comment-post':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor Post comment
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorCommentPostInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCommentPostInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCommentPostInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/comment-reply':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor Post comment reply
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorCommentPostReplyInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCommentPostReplyInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCommentPostReplyInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/share-post':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor Post share
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorPostShareInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostShareInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostShareInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/report-post':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor report post
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorReportPostInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorReportPostInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorReportPostInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/search-tags/{doctorId}?search=value':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get all doctor posts
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
  *              -   name: search
 *                  in: query
 *                  description: search query value
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/tags/{doctorId}?sort=value':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Tags by latest or recent
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
  *              -   name: sort
 *                  in: query
 *                  description: search query value
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/analytics/{doctorId}':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Analytics
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/create-availability':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor availability creation
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorCreateAvailabilityInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCreateAvailabilityInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorCreateAvailabilityInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/{doctorId}/availability':
 *      put:
 *          tags:
 *              - Doctor
 *          summary: Updating doctor availability
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          requestBody:
 *              content:
 *                application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/doctorUpdateAvailabilityInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorUpdateAvailabilityInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor 
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/feed-post/{doctorId}':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Post Feed
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/filter-popular':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Popular post based on number of likes
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/unanswered-posts':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Popular post that are unanswered
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/tags':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Tags
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/top-doctor':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Top Doctor Contributor
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/award-badge':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Badge awards
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/change-post-status/{postId}':
 *      put:
 *          tags:
 *              - Doctor
 *          summary: Updating doctor saved post
 *          parameters:
 *              -   name: postId
 *                  in: path
 *                  description: mongo object _id of the doctor's post document to be updated
 *                  required: true
 *          requestBody:
 *              content:
 *                application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/doctorUpdateSavedPostInput'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorUpdateSavedPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor 
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/saved-post/{doctorId}':
 *      get:
 *          tags:
 *              - Doctor
 *          summary: Get Saved  Post
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/doctorUpdateSavedPostInput'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor post
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/comment-like':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor post comment like
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorPostCommentLikedInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostCommentLikedInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostCommentLikedInputError'
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/comment-unlike':
 *    post:
 *     tags:
 *       - Doctor
 *     summary: Doctor post comment like
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/doctorPostCommentunlikedInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostCommentunlikedInputResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorPostCommentunlikedInputError'
 */