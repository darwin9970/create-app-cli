<template>
    <Button class="button" type="primary" value="small"
            @click="onOpenOptions">打开配置页
    </Button>
    <div class="div">居中</div>
</template>
<script setup>
const onOpenOptions = async function () {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.storage.local.set({ tabId: tabs[0].id });
    await chrome.tabs.create({
        url: chrome.runtime.getURL('options.html')
    });
};
</script>
<style lang="scss" scoped>
.div {
  width: 50px;
  background: $color-primary;
  @extend .flex-ver-center;
  @extend .flex-hor-center;
  @include half_radius(40px);
}
</style>