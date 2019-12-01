<template>
    <div class="clearfix group">
        <div class="label">{{label}}</div>
        <div class="value">
            <input type="text" :value="value" @input="$emit('input', $event.target.value)">
        </div>
    </div>
</template>

<script>
export default {
  props: ["label", "value"],
  components: {},
  created() {},
  data() {
    return {};
  }
};
</script>