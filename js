// Configure AWS Amplify
Amplify.configure({
    Storage: {
        AWSS3: {
            bucket: "minhducsprojects ", // Replace with your actual bucket name
            region: "ca-central-1", // e.g., "us-east-1"
        }
    }
});

// Handle form submission
document.getElementById("project-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const projectName = document.getElementById("project-name").value;
    const address = document.getElementById("address").value;
    let projectType = document.getElementById("project-type").value;

    if (projectType === "autre") {
        projectType = document.getElementById("custom-project-type").value;
    }

    // Create JSON data to be stored in S3
    const projectData = {
        projectName,
        address,
        projectType,
        timestamp: new Date().toISOString()
    };

    try {
        // Convert JSON to a Blob
        const jsonData = new Blob([JSON.stringify(projectData)], { type: "application/json" });

        // Upload the JSON file to S3
        await Amplify.Storage.put(`projects/${projectName}.json`, jsonData, {
            contentType: "application/json",
            level: "private" // Ensures only you can access it
        });

        console.log('Project saved to S3!');
        alert('Project successfully stored in S3!');
    } catch (error) {
        console.error('Error uploading to S3:', error);
        alert('Error saving project to S3!');
    }
});
