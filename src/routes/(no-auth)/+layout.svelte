<script lang="ts">
	import fillImage from '$lib/assets/images/register-login-phishbusters.png';
	import clsx from 'clsx';
</script>

<div>
	<div
		class={clsx([
			'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
			"before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
			"after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700"
		])}
	>
		<div class="container relative z-10 sm:px-10">
			<div class="block grid-cols-2 gap-4 xl:grid">
				<div class="flex-col hidden min-h-screen xl:flex">
					<div class="my-auto">
						<img alt="Phishbusters" class="-mt-16 -ml-36 -intro-x" src={fillImage} />
					</div>
				</div>
				<slot />
			</div>
		</div>
	</div>
</div>
