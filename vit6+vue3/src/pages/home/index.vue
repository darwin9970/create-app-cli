<template>
    <div>
        <div class="store">demoStore：{{ userName }}</div>
        <van-button type="primary" @click="onUpdateDemoStore">修改demoStore</van-button>
        <div class="store">国际化：{{ i18n.t('component.demo') }}</div>
        <van-switch v-model="checked" @change="onSwitchI18n">
            <template v-slot:node>
                <span class="i18n" :style="{'font-size':usePxTransform('14px')}">{{ checked ? 'zh' : 'en' }}</span>
            </template>
        </van-switch>
        <div>
            字体图标：<i class="icon iconfont icon-fanhui"></i>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import storageUtil from '@utility/storageUtil.js';
import usePxTransform from '@hooks/usePxTransform.js';
import { langEnum } from '@lang/enum.js';
import useDemoStore from '@store/useDemoStore.js';

const i18n = useI18n();
const currentLanguage = storageUtil.getLanguage();
const checked = ref(currentLanguage === langEnum.zh);
const demoStore = useDemoStore();
const { userName } = storeToRefs(demoStore);

const onUpdateDemoStore = ()=>[
    demoStore.$patch({
        userName: ['张三','李四','王五'][Math.floor(Math.random() * 3)]
    })
];

const onSwitchI18n = (checked)=>{
    const lang = checked ? langEnum.zh : langEnum.en;
    i18n.locale.value = lang;
    storageUtil.setLanguage(lang);
};

</script>

<style lang="scss" scoped>
.store {
  background: $primary-color;
  width:200px;
  @extend .flex-hor-center;
  @extend .flex-ver-center;
  @include half_radius(40px);
}
.i18n {
  height: 100%;
  width: 100%;
  text-align: center;
  display: block;
  line-height: 24px;
}
</style>