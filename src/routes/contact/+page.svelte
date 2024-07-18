<script lang="ts">
    import { Card, A } from 'flowbite-svelte';
    import { MailIcon, PhoneIcon, LinkedinIcon } from 'svelte-feather-icons';

    // Replace these with your actual contact details
    const email = "greyjenkins@live.com";
    const phone = "+1 (206) 910-8270";
    const linkedin = "https://www.linkedin.com/in/greysonjenkins";
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
    
    <Card class="mb-6">
        <p class="mb-4">Thank you for your interest in reaching out! Please feel free to get in touch using any of the methods below. All inquiries will be directed to the developer of PhiFlow.</p>
    </Card>

    <div class="grid md:grid-cols-3 gap-4">
        <Card>
            <div class="flex items-center mb-2">
                <MailIcon class="mr-2" />
                <h2 class="text-xl font-semibold">Email</h2>
            </div>
            <A href="mailto:{email}">{email}</A>
        </Card>

        <Card>
            <div class="flex items-center mb-2">
                <PhoneIcon class="mr-2" />
                <h2 class="text-xl font-semibold">Phone</h2>
            </div>
            <A href="tel:{phone}">{phone}</A>
        </Card>

        <Card>
            <div class="flex items-center mb-2">
                <LinkedinIcon class="mr-2" />
                <h2 class="text-xl font-semibold">LinkedIn</h2>
            </div>
            <A href={linkedin} target="_blank" rel="noopener noreferrer">View Profile</A>
        </Card>
    </div>
</div>