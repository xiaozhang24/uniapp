<template>
  <view>
    <view class="cu-list menu">
      <view
        class="cu-item arrow"
        v-for="(role,index) in roleList"
        :key="index"
        @tap="goToTable(role)"
      >
        <view class="content">
          <text
            class="cuIcon-title text-orange"
            :class="'text-' + role.color "
          ></text>
          <text>{{role.title}}</text>
        </view>
        <view class="action"><text class="text-grey text-sm">{{role.description}}</text></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      roleList: null
    };
  },
  computed: {},
  methods: {
    onLoad: function(option) {
      let roleList = JSON.parse(decodeURIComponent(option.params));
      roleList.forEach(item => {
        switch (item.role) {
          case "teacher":
            item.title = "教师课程表";
            item.description = "作为教师";
            item.color = "green";
            break;
          case "student":
            item.title = "学生课程表";
            item.description = "作为学生";
            item.color = "orange";
            break;
          case "administrator":
            item.title = "全校课程表";
            item.description = "作为管理者";
            item.color = "yellow";
            break;
        }
      });
      this.roleList = roleList;
    },
    goToTable(role) {
      let path = "table";
      // 管理者进入schoolTable页面
      if (role.role === "administrator") {
        path = "schoolTable";
      }
      uni.navigateTo({
        url:
          "/pages/apps/courseTable/" +
          path +
          "?params=" +
          encodeURIComponent(JSON.stringify(role))
      });
    }
  }
};
</script>

<style></style>
