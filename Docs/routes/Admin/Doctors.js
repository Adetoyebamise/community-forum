/**
 * @openapi
 * paths:
 *  '/api/v1/admin/registered-doctors':
 *      get:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: Get a list of all registered doctors/specialists
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DoctorsList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available Doctors
 */

/**
 * @openapi
 * paths:
 *  'api/v1/admin/doctors':
 *      get:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: Get a list of pending registration requests for doctors/specialists
 *          parameters:
 *              -   name: status
 *                  in: query
 *                  type: string
 *                  description: status of the doctor/specialist registration
 *                  required: true
 *                  example:
 *                      status: 'PENDING'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DoctorsList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/doctors':
 *      get:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: Get a single Doctor by _id
 *          parameters:
 *              -   name: _id
 *                  in: query
 *                  description: _id of the doctor/specialist
 *                  required: true
 *                  example:
 *                      _id: 61fb13fd283f92a5438c65e2
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DoctorsList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */

/**
 * @openapi
 * paths:
 *  'api/v1/admin/doctors/search':
 *      get:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: search for a doctor/specialist
 *          parameters:
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: keyword to use in searching for doctors by fullName
 *                  required: true
 *                  example:
 *                      search: chi
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DoctorsList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available caregivers
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/doctors/{doctorId}':
 *      put:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: update a doctor's status
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
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: whether ACTIVE, PENDING or RESTRICTED
 *                      example:
 *                          status: 'ACTIVE'
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
 *                              message: 'Doctor successfully updated'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctor(s)
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/doctors/{doctorId}':
 *      delete:
 *          tags:
 *              - Admin/Doctors(Specialists)
 *          summary: delete a doctor's document
 *          parameters:
 *              -   name: doctorId
 *                  in: path
 *                  description: mongo object _id of the doctor's document to be deleted
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
 *                              message: 'Doctor successfully deleted'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available doctors
 */