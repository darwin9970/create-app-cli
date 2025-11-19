<template>
    <div>
        <Button type="primary"
                @click="onUpdateDemoStore">
            修改store
        </Button>
        <div class="store">
            {{ useDemo.userName }}
        </div>
        <div>
            <Radio-group name="radioGroup"
                         v-model:value="lang"
                         @change="onSwitchLang">
                <Radio :value="LangEnum.zh">
                    中文
                </Radio>
                <Radio :value="LangEnum.en">
                    英文
                </Radio>
            </Radio-group>
            <p>
                <span>$t：</span>
                <span>{{ $t("ok") }}</span>
            </p>
            <i class="iconfont icon-fanhui"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useEnv } from '@hooks/useCommon';
import useDemoStore from '@store/useDemoStore';
import requests from '@common/requests.ts';
import storageUtil from '@utility/storageUtil.ts';
import { LangEnum } from '@lang/enum.ts';


console.log('当前环境：', useEnv());

//状态管理demo
const useDemo = useDemoStore();

const onUpdateDemoStore = () => {
    const demoStore: DemoStore.State = {
        userId: 'userId',
        userName: ['张三','李四','王五'][Math.floor(Math.random() * 3)]
    };
    useDemo.updateState(demoStore);
};

//国际化语言切换
const i18n = useI18n();
const lang = ref(i18n.locale.value);
const onSwitchLang = (event: MouseEvent) => {
    const lang = (event.target as HTMLInputElement).value;
    i18n.locale.value = lang;
    storageUtil.setLanguage(lang);
    console.log(i18n.t('ok'));
};

const axiosTest = async () => {
    const result = await requests.get('https://randomuser.me/api/');
    console.log('请求结果：', result);
};

axiosTest();
</script>
<style lang="scss" scoped>
.store {
  background: $color-primary;
  width: 50px;
  @extend .flex-hor-center;
  @extend .flex-ver-center;
  @include half_radius(50px);
}

a {
  color: blue;
}
</style>