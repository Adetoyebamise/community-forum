/**
 * @openapi
 * components:
 *  schemas:
 *      DoctorsList:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  is_SavedPosts:
 *                      type: array
 *                  timePeriods:
 *                      type: array
 *                  isVerified:
 *                      type: boolean
 *                  availability:
 *                      type: array
 *                  is_Available:
 *                      type: boolean
 *                  _id:
 *                      type: string
 *                  fullName:
 *                      type: string,
 *                  emailAddress:
 *                      type: string
 *                  role:
 *                      type: string
 *                  phoneNumber:
 *                      type: string
 *                  yearsOfExperience:
 *                      type: integer
 *                  imageUrl:
 *                      type: string
 *                  medicalLicenseURL:
 *                      type: string
 *                  validIdCardURL:
 *                      type: string
 *                      enum: ["NationalIdCard", "DriversLicense"]
 *                  address:
 *                      type: string
 *                  country:
 *                      type: string
 *                  cityOrState:
 *                      type: string
 *                  emailToken:
 *                      type: string
 *                  consultationHistory:
 *                      type: array
 *                  availabilityId:
 *                      type: array
 *                  bookingsId:
 *                      type: array
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 *                  verificationCode:
 *                      type: string
 *                  posts:
 *                      type: array
 *                  status:
 *                      type: string
 *                      enum: ['PENDING', 'ACTIVE', 'RESTRICTED']
 */