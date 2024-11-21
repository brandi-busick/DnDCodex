<template>
  <div class="flex relative mx-5">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="ml-2 prose prose-invert lg:prose-lg">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

</style>
