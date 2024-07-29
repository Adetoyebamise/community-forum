/**
 * @openapi
 * paths:
 *  '/api/v1/admin/caregivers':
 *      get:
 *          tags:
 *              - Admin/Caregivers
 *          summary: Get all registered caregivers
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CaregiversList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available caregivers
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/caregivers/search':
 *      get:
 *          tags:
 *              - Admin/Caregivers
 *          summary: search for caregivers
 *          parameters:
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: keyword to use in searching for caregivers
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CaregiversList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available caregivers
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/caregivers/{caregiverId}':
 *      put:
 *          tags:
 *              - Admin/Caregivers
 *          summary: update a caregiver status
 *          parameters:
 *              -   name: caregiverId
 *                  in: path
 *                  description: mongo object _id of the caregiver's document to be updated
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: whether ACTIVE or RESTRICTED
 *                      example:
 *                          status: 'RESTRICTED'
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
 *                              message: 'Caregiver successfully updated'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available caregivers
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/caregivers/{caregiverId}':
 *      delete:
 *          tags:
 *              - Admin/Caregivers
 *          summary: delete a caregiver
 *          parameters:
 *              -   name: caregiverId
 *                  in: path
 *                  description: mongo object _id of the caregiver's document to be deleted
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
 *                              message: 'Caregiver successfully deleted'
 *                              success: true
 *                              statusCode: 200
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available caregivers
 */