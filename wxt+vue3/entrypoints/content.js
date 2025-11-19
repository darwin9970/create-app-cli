export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        console.log('环境配置',import.meta.env);
        function injectScript(scriptName,data) {
            const src = chrome.runtime.getURL(`assets/js/${scriptName}.js`);
            const script = document.createElement('script');
            script.src = src;
            if(data) script.dataset.data = JSON.stringify(data);
            document.documentElement.appendChild(script);
            document.documentElement.removeChild(script);
        }

        injectScript('update');
    }
});
