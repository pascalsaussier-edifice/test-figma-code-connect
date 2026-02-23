#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const glob_1 = require("glob");
const args = process.argv.slice(2);
const command = args[0];
const moduleFlag = args.indexOf('--module');
const moduleName = moduleFlag !== -1 ? args[moduleFlag + 1] : null;
function replaceImports(distDir, targetModule) {
    const jsFiles = (0, glob_1.globSync)(`${distDir}/**/*.js`);
    jsFiles.forEach((file) => {
        let content = (0, fs_1.readFileSync)(file, 'utf-8');
        // Replace relative imports from parent (..)
        content = content.replace(/from\s+["']\.\.["']/g, `from "@edifice.io/rest-client-base/${targetModule}"`);
        // Replace direct imports from the package
        content = content.replace(/from\s+["']@edifice\.io\/rest-client-base["']/g, `from "@edifice.io/rest-client-base/${targetModule}"`);
        (0, fs_1.writeFileSync)(file, content, 'utf-8');
    });
    console.log(`✅ Imports replaced in ${distDir} with @edifice.io/rest-client-base/${targetModule}`);
}
function initReactNative() {
    (0, child_process_1.execSync)('mkdir -p dist/react-native', { stdio: 'inherit' });
    (0, child_process_1.execSync)('cp -r dist/browser/* dist/react-native/', { stdio: 'inherit' });
    (0, child_process_1.execSync)('find dist/react-native -name "*.node.js*" -delete', {
        stdio: 'inherit',
    });
    console.log('✅ React Native distribution initialized from browser build');
}
switch (command) {
    case 'init':
        if (moduleName === 'react-native') {
            initReactNative();
        }
        else {
            console.error('❌ Unknown module for init. Use: --module react-native');
            process.exit(1);
        }
        break;
    case 'replace': {
        if (!moduleName) {
            console.error('❌ Missing --module flag. Use: --module browser|react-native');
            process.exit(1);
        }
        const distDir = (0, path_1.join)(process.cwd(), 'dist', moduleName);
        replaceImports(distDir, moduleName);
        break;
    }
    default:
        console.error('❌ Unknown command. Available commands: init, replace');
        process.exit(1);
}
