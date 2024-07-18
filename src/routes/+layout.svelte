<script lang="ts">
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<div class="relative px-8">
	<div class="py-10">
	<Navbar class="fixed start-0 top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4" color="primary">
		<NavBrand href="/" class="-ml-20 ml-0">
			<img src="/images/phi_icon.svg" class="mr-3 h-6 sm:h-9" alt="PhiFlow Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				PhiFlow
			</span>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl}>
			<NavLi href="/">Home</NavLi>
			<NavLi class="cursor-pointer">
				Tools<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white" />
			</NavLi>
			<Dropdown class="z-20 w-44">
				<DropdownItem href="/tools/sandbox">Sandbox</DropdownItem>
				<DropdownItem href="/tools/truthtrees">Truth Trees</DropdownItem>
				<DropdownItem href="/tools/truthtables">Truth Tables</DropdownItem>
			</Dropdown>
			<NavLi href="/resources">Resources</NavLi>
			<NavLi href="/help">Help</NavLi>
			<NavLi href="/about">About</NavLi>
		</NavUl>
	</Navbar>
	</div>

	<main class="flex-grow">
		<slot />
	</main>

	<Footer class="bg-white p-4 dark:bg-gray-800 md:p-8 lg:p-10">
		<div class="mx-auto max-w-screen-xl text-center">
			<FooterLinkGroup
				ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white"
			>
				<FooterLink href="/">About</FooterLink>
				<FooterLink href="/privacy">Privacy Policy</FooterLink>
				<FooterLink href="/contact">Contact</FooterLink>
			</FooterLinkGroup>
			<FooterCopyright href="/" by="Greyson Jenkins." year={2024} />
		</div>
	</Footer>
</div>
