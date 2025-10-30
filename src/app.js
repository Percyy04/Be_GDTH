const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const config = require('./config/config');

const app = express();


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { background-color: #2c3e50; }',
    customSiteTitle: 'Giai Điệu Tự Hào API Docs'
}));

// Test route
app.get('/', (req, res) => {
    res.json({
        message: '✅ Backend API Giai Điệu Tự Hào đã chạy!',
        version: '1.0',
        documentation: '/api-docs',
        timestamp: new Date()
    });
});

// Import routes
const organizationRoutes = require('./routes/organization.routes');
const judgeRoutes = require('./routes/judge.routes');
const roundRoutes = require('./routes/round.routes');
const performanceRoutes = require('./routes/performance.routes');
const scoreRoutes = require('./routes/score.routes');
const rankingRoutes = require('./routes/ranking.routes');
const criterionRoutes = require('./routes/criterion.routes');
const exportRoutes = require('./routes/export.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const roundOrganizationRoutes = require('./routes/roundOrganization.routes');

// Sử dụng routes
app.use('/api/judges', judgeRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/criteria', criterionRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/round-organizations', roundOrganizationRoutes);


// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy API endpoint'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Có lỗi xảy ra!',
        message: err.message
    });
});

module.exports = app;
