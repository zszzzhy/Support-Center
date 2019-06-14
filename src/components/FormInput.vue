<template>
  <div class="row">
    <component
      :is="element"
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value.prop="text"
      :placeholder="placeholder"
      @input="update"
      v-bind="$attrs"
    />
  </div>
</template>


<script>
export default {
  model: {
    prop: "text",
    event: "update"
  },
  props: {
    // 输入框的的 HTML 名称
    name: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    text: {
      required: true
    },
    placeholder: {
      type: String
    },
    // 用来切换无效显示（红色边框）的布尔值
    invalid: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // 动态改变输入框的 CSS 类
    inputClass() {
      return {
        invalid: this.invalid
      };
    },
    // 决定渲染什么元素
    element() {
      return this.type === "textarea" ? this.type : "input";
    }
  },

  methods: {
    update(event) {
      this.$emit("update", event.currentTarget.value);
    }
  }
};
</script>

<style lang="stylus" scoped>
.input {
  &.invalid {
    border-color: red;
  }
}
</style>
