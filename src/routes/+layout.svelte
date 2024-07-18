<script lang="ts">
    import '../app.css';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider, Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    $: activeUrl = $page.url.pathname;
</script>

<div class="relative px-8">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b" color="primary">
        <NavBrand href="/" class="ml-0 -ml-20">
            <img
                src="/images/phi_icon.svg"
                class="mr-3 h-6 sm:h-9"
                alt="PhiFlow Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                PhiFlow
            </span>
        </NavBrand>
        <NavHamburger />
        <NavUl {activeUrl}>
            <NavLi href="/">Home</NavLi>
            <NavLi class="cursor-pointer">
                Tools<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
            </NavLi>
            <Dropdown class="w-44 z-20">
                <DropdownItem href="/tools/sandbox">Sandbox</DropdownItem>
                <DropdownItem href="/docs/components/navbar">Truth Trees</DropdownItem>
                <DropdownItem href="/">Truth Tables</DropdownItem>
            </Dropdown>
            <NavLi href="/resources">Resources</NavLi>
            <NavLi href="/help">Help</NavLi>
            <NavLi href="/about">About</NavLi>
        </NavUl>
    </Navbar>

    <main class="flex-grow pt-10">
        <slot />
    </main>

    <Footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
        <div class="mx-auto max-w-screen-xl text-center">
            <FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                <FooterLink href="/">About</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
            </FooterLinkGroup>
            <FooterCopyright href="/" by="Greyson Jenkins." year={2024} />
        </div>
    </Footer>
</div>