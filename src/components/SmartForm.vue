<template>
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{title}}</h2>
      <!-- Main content -->
      <slot/>
      <div class="actions">
        <!-- Action buttons -->
        <slot name="actions"/>
      </div>

      <div class="error" v-if="error">{{error}}</div>
    </section>

    <transition name="fade">
      <!-- Expanding over the form -->
      <Loading v-if="busy" class="overlay"/>
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    // 提交表单调用
    operation: {
      type: Function,
      required: true
    },
    // 防止表单在无效时调用操作
    valid: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      error: null, // 错误信息
      busy: false // 用于切换加载动画的显示
    };
  },

  methods: {
    async submit() {
      if (this.valid && !this.busy) {
        this.error = null;
        this.busy = true;
        try {
          await this.operation();
        } catch (err) {
          this.error = err.message;
        }
        this.busy = false;
      }
    }
  }
};
</script>
