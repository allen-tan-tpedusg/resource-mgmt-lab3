const fs = require('fs').promises;
const path = require('path');

const RESOURCES_FILE = path.join('utils', 'resources.json');

async function viewResources(req, res) {
  try {
    // Read the resources file
    const data = await fs.readFile(RESOURCES_FILE, 'utf8');
    const allResources = JSON.parse(data);

    // Return the resources as JSON
    return res.status(200).json(allResources);
  } catch (error) {
    // Handle case where the file does not exist yet
    if (error.code === 'ENOENT') {
      return res.status(200).json([]); // Return an empty list if no file exists
    }
    
    // Handle other errors (e.g., parsing issues)
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { viewResources };