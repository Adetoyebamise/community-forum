/**
 * @openapi
 * components:
 *  schemas:
 *      ChildrenList:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  childName:
 *                      type: string
 *                  dateOfBirth:
 *                      type: string,
 *                  gender:
 *                      type: string,
 *                      enum: ['male', 'female']
 *                  address:
 *                      type: string
 *                  vaccinationPlace:
 *                      type: string
 *                  caregiverId:
 *                      type: object,
 *                      $ref: '#/components/schemas/CaregiversList'
 *                  vaccinationType:
 *                      type: string
 *                  bloodGroup:
 *                      type: string,
 *                      enum: ['A', 'B', 'AB', 'O']
 *                  genotype:
 *                      type: string,
 *                      enum: ['AA', 'SS', 'AS', 'AC']
 *                  allergies:
 *                      type: string
 *                  specialNeeds:
 *                      type: string
 *                  medicalCondition:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 */