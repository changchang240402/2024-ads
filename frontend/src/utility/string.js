function stringProcessing(data) {
    const parts = data.match(/(\w+) aged (\d+)-(\d+) (.+?) activities\./);

    if (parts) {
        const [_, target, start, end, action] = parts;
        return {
            human: target,
            start_age: start,
            end_age: end,
            activities: action
        }
    } else {
        console.log("Invalid sentence format.");
        return null;
    }
}

export default stringProcessing;