try {
    const response = await Amplify.Storage.put(`projects/${projectName}.json`, jsonData, {
        contentType: "application/json",
        level: "private"
    });

    alert(`Upload successful! File key: ${response.key}`);
} catch (error) {
    alert(`Upload failed! Error: ${error.message}`);
}
