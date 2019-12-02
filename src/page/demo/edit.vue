<template>
  <div>
    <v-menu select="demoEdit"></v-menu>
    <table class="edit_table">
      <tr>
        <td>用户名</td>
        <td>
          <input type="text">
        </td>
        <td>账号</td>
        <td>
          <input type="text">
        </td>
      </tr>
      <tr>
        <td>用户名</td>
        <td>
          <input type="text">
        </td>
        <td>账号</td>
        <td>
          <input type="text">
        </td>
      </tr>
      <tr>
        <td>用户名</td>
        <td>
          <input type="text">
        </td>
        <td>账号</td>
        <td>
          <select>
            <option value="s">发多少</option>
            <option value="s2">发多少2</option>
            <option value="s3">发多少3</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      selects: [
        { id: "1", name: "测试1" },
        { id: "2", name: "测试2" },
        { id: "3", name: "测试3" }
      ]
    };
  },
  methods: {}
};
</script>