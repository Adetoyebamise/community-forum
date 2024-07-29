/**
 * @openapi
 * components:
 *  schemas:
 *      doctorUpdateInput:
 *          type: object
 *          required:
 *              - fullName
 *              - emailAddress
 *              - phoneNumber
 *              - bio
 *              - doctorImage
 *          properties:
 *              fullName:
 *                  type: string
 *                  default: Moyin Baderu
 *              emailAddress:
 *                  type: string
 *                  default: doctor@example.com
 *              phoneNumber:
 *                  type: string
 *                  default: 07078645612
 *              doctorImage: 
 *                  type: file
 *                  default: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              bio:
 *                  type: string
 *                  default: Intelligent and Loving Doctor
 *      doctorUpdateResponse:
 *          type: object
 *          properties:
 *              fullName:
 *                  type: string
 *              emailAddress:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              doctorImage:
 *                  type: file
 *              bio:
 *                  type: string
 *              _id:
 *                  type: string
 *              
 *          example:
 *              fullName: Moyin Baderu
 *              emailAddress: doctor@example.com
 *              phoneNumber: 07078645612
 *              bio: Intelligent and Loving Doctor
 *              imageURL: "https://res.cloudinary.com/zillight/image/upload/v1647939798/Zillight"
 *              _id: 6226fb84fd0478fa0e2fc8b4
 */