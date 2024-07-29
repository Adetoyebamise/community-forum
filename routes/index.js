const caregiverRoutes = require("./CaregiverRoutes")
const doctorsRoutes = require("./DoctorsRoutes")
const paymentRoutes = require("./paymentRoutes")
const socialMediaRoutes = require("./socialMediaRoutes")
const superAdminRoutes = require("./SuperAdminRoutes")
const authRoute = require("./authRoute")
const adminRoutes = require("./AdminRoutes")

const routes = app => {
    app.use("/api/v1/caregiver", caregiverRoutes)
    app.use("/api/v1/doctor", doctorsRoutes)
    app.use("/api/v1/payment", paymentRoutes)
    app.use("/api/v1/socialmedia", socialMediaRoutes)
    app.use("/api/v1/superadmin", superAdminRoutes)
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/admin", adminRoutes)
}

module.exports = routes