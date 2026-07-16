'use client';

import {useState, ChangeEvent, FormEvent} from 'react';
import {Mail, MessageSquare, Phone, Send, User} from 'lucide-react';
import HeaderText from '../ui/HeaderText';
import BodyText from '../ui/BodyText';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    number: string; // Optional field for phone number
}

export default function Form() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
        number: '' // Initialize phone number field
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate required fields
        if (!formData.name) {
            alert("Please enter your name.");
            setIsLoading(false);
            return;
        }
        if (!formData.email) {
            alert("Please enter your email.");
            setIsLoading(false);
            return;
        }
        if (!formData.number) {
            alert("Please enter your phone number.");
            setIsLoading(false);
            return;
        }
        if (!formData.message) {
            alert("Please enter your message.");
            setIsLoading(false);
            return;
        }


        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({formData: formData}),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Something went wrong');
            }

            alert("Your message has been sent successfully!");

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: '',
                number: '' // Reset phone number field
            });

            const data = await response.json();
            console.log("Form submitted:", data);

        } catch (error) {
            console.error("Error submitting the form:", error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClassName = "block w-full rounded-xl border border-gray-200 bg-misty-blue/40 pl-11 pr-4 py-3 text-lg text-header-text placeholder:text-gray-400 transition-colors focus:border-primary-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-teal/20";
    const iconClassName = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400";

    return (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-xl sm:px-12 sm:py-16">
            <div className="mx-auto max-w-4xl">
                {/* Form Header */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary-teal/10">
                        <MessageSquare className="size-6 text-primary-teal" />
                    </div>
                    <HeaderText className="text-header-text font-medium font-serif">
                        Send us a Message
                    </HeaderText>
                    <BodyText className="mt-3 text-body-text">
                        Fill out the form below and our team will get back to you shortly.
                    </BodyText>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold text-header-text">
                            Full Name
                        </label>
                        <div className="relative mt-2">
                            <User className={iconClassName} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={inputClassName}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-header-text">
                            Email Address
                        </label>
                        <div className="relative mt-2">
                            <Mail className={iconClassName} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={inputClassName}
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="sm:col-span-2">
                        <label htmlFor="number" className="block text-lg font-semibold text-header-text">
                            Phone Number
                        </label>
                        <div className="relative mt-2">
                            <Phone className={iconClassName} />
                            <input
                                id="number"
                                name="number"
                                type="tel"
                                autoComplete="tel"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                                className={inputClassName}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-lg font-semibold text-header-text">
                            Message
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message..."
                                className="block w-full rounded-xl border border-gray-200 bg-misty-blue/40 px-4 py-3 text-lg text-header-text placeholder:text-gray-400 transition-colors focus:border-primary-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-teal/20"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* HIPAA Disclaimer */}
                <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-amber-900">
                        <strong>Please be advised:</strong> This contact form is not HIPAA compliant. Please be cautious about including any protected health information (PHI) or sensitive medical details in your message.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-full bg-primary-teal px-10 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : (
                            <>
                                Send Message
                                <Send className="size-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}