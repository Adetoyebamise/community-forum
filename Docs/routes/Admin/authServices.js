/**
 * @openapi
 * paths:
 *  '/api/v1/admin/register':
 *    post:
 *     tags:
 *       - Admin/Auth
 *     summary: Create an Admin account
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/adminSignUpInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/adminSignUpResponse'
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */

/**
 * @openapi
 * paths:
 *  '/api/v1/admin/v1':
 *    post:
 *     tags:
 *       - Admin/Auth
 *     summary: Admin login
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/adminLoginInput'
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/adminLoginResponse'
 *          401:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/adminLoginPasswordError'
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/adminLoginAccountError'
 */