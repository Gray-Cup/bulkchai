import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Bulk Chai - Learn how Gray Cup Enterprises Pvt. Ltd. collects, uses, and protects your personal information.',
})

export default function PrivacyPolicy() {
    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Privacy Policy
                </h1>
                <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="prose prose-lg max-w-none pb-8 pt-10 dark:prose-invert">
                <section className="mb-8">
                    <h2>Introduction</h2>
                    <p>
                        Welcome to Bulk Chai, operated by Gray Cup Enterprises Pvt. Ltd. ("we," "our," or "us").
                        We are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                        visit our website {siteMetadata.siteUrl} or use our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Information We Collect</h2>

                    <h3>Personal Information</h3>
                    <p>We may collect the following types of personal information:</p>
                    <ul>
                        <li><strong>Contact Information:</strong> Name, email address, phone number, business name, and shipping address</li>
                        <li><strong>Business Information:</strong> Company name, GST number, business type, and industry</li>
                        <li><strong>Order Information:</strong> Product selections, quantities, delivery preferences, and payment details</li>
                        <li><strong>Communication Records:</strong> Messages, inquiries, and feedback you send to us</li>
                    </ul>

                    <h3>Automatically Collected Information</h3>
                    <p>When you visit our website, we may automatically collect:</p>
                    <ul>
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on pages</li>
                        <li>Referring website addresses</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>How We Use Your Information</h2>
                    <p>We use the collected information for the following purposes:</p>
                    <ul>
                        <li><strong>Order Processing:</strong> To process and fulfill your bulk tea orders</li>
                        <li><strong>Customer Service:</strong> To respond to your inquiries and provide support</li>
                        <li><strong>Business Communication:</strong> To send order confirmations, shipping updates, and important notices</li>
                        <li><strong>Freight Calculation:</strong> To provide accurate shipping cost estimates based on your location</li>
                        <li><strong>Website Improvement:</strong> To analyze usage patterns and improve our services</li>
                        <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations, including GST requirements</li>
                        <li><strong>Marketing:</strong> To send promotional materials and updates about our products (with your consent)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>Information Sharing and Disclosure</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Third-party logistics partners, payment processors, and delivery services</li>
                        <li><strong>Legal Requirements:</strong> Government authorities when required by law or to protect our rights</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                    <p>
                        We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information
                        against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                        over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
                        traffic, and understand user preferences. You can control cookie settings through your browser
                        preferences. Note that disabling cookies may affect website functionality.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Your Rights</h2>
                    <p>Under applicable data protection laws, you have the right to:</p>
                    <ul>
                        <li><strong>Access:</strong> Request access to your personal information</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                        <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                        <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Data Retention</h2>
                    <p>
                        We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                        Privacy Policy, unless a longer retention period is required by law. Business records, including order
                        histories and invoices, may be retained for accounting and tax compliance purposes as required under
                        Indian law.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices
                        of these external sites. We encourage you to review their privacy policies before providing any personal
                        information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Children's Privacy</h2>
                    <p>
                        Our services are intended for business users and are not directed to individuals under the age of 18.
                        We do not knowingly collect personal information from minors.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                        requirements. We will notify you of any material changes by posting the new Privacy Policy on this
                        page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                        please contact us:
                    </p>
                    <address className="not-italic">
                        <strong>Gray Cup Enterprises Pvt. Ltd.</strong><br />
                        Email: <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a><br />
                        Website: <a href={siteMetadata.siteUrl} target="_blank" rel="noopener noreferrer">{siteMetadata.siteUrl}</a>
                    </address>
                </section>

                <section className="mb-8">
                    <h2>Governing Law</h2>
                    <p>
                        This Privacy Policy is governed by the laws of India. Any disputes relating to this Privacy Policy
                        shall be subject to the exclusive jurisdiction of the courts in India.
                    </p>
                </section>
            </div>
        </div>
    )
}
