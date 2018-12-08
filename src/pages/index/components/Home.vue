<template>
  <div id='memberHome'>

    <div class='head'>
      <div class='head_top'><img src='../image/member_top_bg.png' /></div>
      <div class=head_card>
        <div><img src='../image/member_vipcard_bg.png' /></div>
        <p class='text'>会员卡</p>
      </div>
    </div>

    <div class='main'>
      <div class='title'>
        <img src='../image/title_bg_1.png' />
        <p>会员专属9大特权</p>
        <img src='../image/title_bg_2.png' />
      </div>
      <div class='mainContent'>
        <div class='itemBox' v-for="item in itemData" :key='item.id'>
          <img :src='item.url' />
          <p>{{item.title}}</p>
          <span>{{item.detail}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {config} from './config'
export default {
  name: "Home",
  data() {
    return {
      itemData:config
    };
  }
};
</script>
<style scoped>
@import url('../css/index.css');
</style>
