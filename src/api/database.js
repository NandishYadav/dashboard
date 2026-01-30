const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Log configuration on module load
console.log('🔧 API Configuration:');
console.log('  - Base URL:', API_BASE_URL);

/**
 * Database API Service
 * Provides methods to interact with the database monitoring API
 */
export const databaseAPI = {
    /**
     * Get active incidents for a specific database
     * @param {string} dbName - Database name (e.g., 'ORCL_PROD')
     * @returns {Promise<Array>} Array of incident objects
     */
    getIncidents: async (dbName) => {
        console.log(`🌐 Fetching incidents from API: ${API_BASE_URL}/incidents?database=${dbName}`);
        try {
            const response = await fetch(`${API_BASE_URL}/incidents?database=${dbName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch incidents: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully fetched incidents from API');
            return data;
        } catch (error) {
            console.error('❌ Error fetching incidents:', error);
            throw error;
        }
    },

    /**
     * Get CPU metrics (session and SQL level) for a specific database
     * @param {string} dbName - Database name
     * @param {string} timeRange - Time range (e.g., '5h', '1h', '30m')
     * @returns {Promise<Object>} Object containing sessionCPU and sqlQueryCPU arrays
     */
    getCPUMetrics: async (dbName, timeRange) => {
        console.log(`🌐 Fetching CPU metrics from API: ${API_BASE_URL}/cpu-metrics?database=${dbName}&range=${timeRange}`);
        try {
            const response = await fetch(
                `${API_BASE_URL}/cpu-metrics?database=${dbName}&range=${timeRange}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch CPU metrics: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully fetched CPU metrics from API');
            return data;
        } catch (error) {
            console.error('❌ Error fetching CPU metrics:', error);
            throw error;
        }
    },

    /**
     * Get storage health information including tablespaces and wait class data
     * @param {string} dbName - Database name
     * @returns {Promise<Object>} Object containing tablespaces and waitClassData arrays
     */
    getStorageHealth: async (dbName) => {
        console.log(`🌐 Fetching storage health from API: ${API_BASE_URL}/storage?database=${dbName}`);
        try {
            const response = await fetch(`${API_BASE_URL}/storage?database=${dbName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch storage health: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully fetched storage health from API');
            return data;
        } catch (error) {
            console.error('❌ Error fetching storage health:', error);
            throw error;
        }
    },

    /**
     * Get blocking sessions information
     * @param {string} dbName - Database name
     * @returns {Promise<Array>} Array of blocking session objects
     */
    getBlockingSessions: async (dbName) => {
        console.log(`🌐 Fetching blocking sessions from API: ${API_BASE_URL}/blocking-sessions?database=${dbName}`);
        try {
            const response = await fetch(`${API_BASE_URL}/blocking-sessions?database=${dbName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch blocking sessions: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully fetched blocking sessions from API');
            return data;
        } catch (error) {
            console.error('❌ Error fetching blocking sessions:', error);
            throw error;
        }
    },

    /**
     * Kill a database session
     * @param {number} sid - Session ID to kill
     * @returns {Promise<Object>} Response object with success status
     */
    killSession: async (sid) => {
        console.log(`🌐 Killing session ${sid} via API`);
        try {
            const response = await fetch(`${API_BASE_URL}/sessions/${sid}/kill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to kill session: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully killed session');
            return data;
        } catch (error) {
            console.error('❌ Error killing session:', error);
            throw error;
        }
    },

    /**
     * Get available databases
     * @returns {Promise<Array>} Array of database objects
     */
    getDatabases: async () => {
        console.log(`🌐 Fetching databases from API: ${API_BASE_URL}/databases`);
        try {
            const response = await fetch(`${API_BASE_URL}/databases`);
            if (!response.ok) {
                throw new Error(`Failed to fetch databases: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('✅ Successfully fetched databases from API');
            return data;
        } catch (error) {
            console.error('❌ Error fetching databases:', error);
            throw error;
        }
    },
};

export default databaseAPI;
