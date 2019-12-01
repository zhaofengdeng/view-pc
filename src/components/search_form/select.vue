<template>
    <div class="clearfix group">
        <div class="label">{{label}}</div>
        <div class="value">
            <select
                :value="value"
                @change="emitEvent( $event.target.value)"
                @input="$emit('input', $event.target.value)"
            >
                <option v-for="item in objects" :value="item[optionKey]">{{item[optionLabel]}}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
  props: ["label", "value", "objects", "optionKey", "optionLabel"],
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {
    emitEvent(value) {
      this.$emit("input", value);
      this.$emit("change");
    }
  },
  mounted() {
    if (this.StringUtil.isNull(this.optionKey)) {
      this.optionKey = "value";
    }
    if (this.StringUtil.isNull(this.optionLabel)) {
      this.optionLabel = "label";
    }
  }
};
</script>