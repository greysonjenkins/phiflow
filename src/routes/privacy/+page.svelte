<script lang="ts">
    import { Alert } from 'flowbite-svelte';

    let cards = [
        {
            title: "Privacy First",
            content: "Our website prioritizes your privacy. We do not collect or store any personal information."
        },
        {
            title: "Cookies and Tracking",
            content: "Our website does not use cookies or any other tracking technologies. Your browsing experience remains private and anonymous."
        },
        {
            title: "Global Application",
            content: "This privacy policy applies globally to all users of our website, regardless of their location."
        },
        {
            title: "Third-Party Sharing",
            content: "We do not share any user data with third parties, as we do not collect any personal information."
        },
        {
            title: "Policy Updates",
            content: "We may update this privacy policy from time to time. Any changes will be reflected on this page, and we encourage you to review this policy periodically."
        }
    ];
</script>

<div class="mt-10 grid md:grid-cols-3 gap-4">
    {#each cards as { title, content }}
        <Alert color="blue">
            <h2 class="text-xl font-semibold mb-2">{title}</h2>
            <p>{content}</p>
        </Alert>
    {/each}
</div>