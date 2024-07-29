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
 *       - Doctor/Login
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
 *              - Doctor Profile Update
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
 *                          $ref: '#/components/schemas/doctorSignUpInput'
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
 *  '/api/v1/doctor/profile-medical-license/{doctorId}':
 *    put:
 *     tags:
 *       - Doctor
 *     summary: Updating Doctor Medical License
 *     parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *     requestBody:
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/doctorMedicalLicenseInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorMedicalLicenseResponse'
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/doctor/profile-valid-card/{doctorId}':
 *    put:
 *     tags:
 *       - Doctor
 *     summary: Updating Doctor Valid card
 *     parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be updated
 *                  required: true
 *     requestBody:
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/doctorValidCardInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/doctorValidCardResponse'
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */