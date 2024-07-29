
/**
 * @openapi
 * paths:
 *  '/api/v1/admin/children':
 *      get:
 *          tags:
 *              - Admin/Children
 *          summary: Get a list of all registered Children
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ChildrenList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available Doctors
 */

/**
 * @openapi
 * paths:
 *  'api/v1/admin/children/search':
 *      get:
 *          tags:
 *              - Admin/Children
 *          summary: search for children
 *          parameters:
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: keyword to use in searching for child by fullName
 *                  required: true
 *                  example:
 *                      search: eun
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ChildrenList'
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: No available children
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/children/{childId}':
 *      delete:
 *          tags:
 *              - Admin/Children
 *          summary: delete a child
 *          parameters:
 *              -   name: childId
 *                  in: path
 *                  description: mongo object _id of the child's document to be deleted
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