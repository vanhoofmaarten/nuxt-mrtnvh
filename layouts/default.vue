<template>
	<main>
		<nuxt />
	</main>
</template>

<style>
html {
    @apply leading-normal text-black;
    background-color: config("colors.white");
    font-family: config("fonts.sans");
    font-size: 16px;
}

/* stylelint-disable selector-id-pattern, selector-max-id, selector-max-specificity */
#__layout {
    @apply flex flex-col min-h-screen items-center justify-center;
}
</style>
