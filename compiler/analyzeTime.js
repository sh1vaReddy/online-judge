export const analyzeCpp = (code) => {
    const loopPattern = /(for|while|do\s*.*\s*{)/g;
    const matches = code.match(loopPattern);
    return matches ? matches.length : 0;
};

export const analyzePython = (code) => {
    const loopPattern = /(for|while|def\s+\w+\s*\(.*\)\s*:.+)/g;
    const matches = code.match(loopPattern);
    return matches ? matches.length : 0;
};

export const analyzeJava = (code) => {
    const loopPattern = /(for|while|do\s*\(.*\)\s*\{)/g;
    const matches = code.match(loopPattern);
    return matches ? matches.length : 0;
};

export const analyzeJavaScript = (code) => {
    const lines = code.trim().split('\n');
    let maxLoopDepth = 0;
    
    for (let line of lines) {
        const loopDepth = getLoopDepth(line);
        maxLoopDepth = Math.max(maxLoopDepth, loopDepth);
    }
    
    return maxLoopDepth;
};