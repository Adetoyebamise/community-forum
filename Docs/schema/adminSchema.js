/**
 * @openapi
 * components:
 *  schemas:
 *      adminSignUpInput:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  default: admin@example.com
 *              password:
 *                  type: string
 *                  default: Admin123
 *              accountType:
 *                  type: string
 *                  enum: ['FirstLevel', 'SecondLevel']
 *                  default: FirstLevel
 *              status:
 *                  type: string
 *                  default: ACTIVE
 *      adminSignUpResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              accountType:
 *                  type: string
 *              _id:
 *                  type: string
 *              status:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *          example:
 *              email: admin@example.com
 *              password: $2b$10$h3Ryb8Mpr7Gi.nPVCNQvve794UWp6xzdq70lcF.oU3w81uk4ufnGi
 *              accountType: FirstLevel
 *              _id: 6226fb84fd0478fa0e2fc8b4
 *              status: ACTIVE
 *              createdAt: 2022-03-08T06:45:24.337Z
 *      adminLoginInput:
 *          type: object
 *          properties:
 *              email:
 *                  type: string,
 *                  default: admin@example.com
 *              password:
 *                  type: string
 *                  default: admin
 *      adminLoginResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string,
 *              adminId:
 *                  type: string
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJh...
 *              adminId: 6226fac9fd0478fa0e2fc8ae
 *      adminLoginPasswordError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Password entered was incorrect!, Please Try Again
 *              success: false
 *              statusCode: 401
 *      adminLoginAccountError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              success:
 *                  type: boolean
 *              statusCode:
 *                  type: integer
 *          example:
 *              message: Account not found, Please signup to continue
 *              success: false
 *              statusCode: 401
 *              data: {}
 */