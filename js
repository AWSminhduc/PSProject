const response = await Amplify.Storage.put(`projects/${projectName}.json`, jsonData, {
    contentType: "application/json",
    level: "private"
});
