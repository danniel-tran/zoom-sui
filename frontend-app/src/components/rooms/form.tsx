'use client';

import { useState } from 'react';
import {
    PlusIcon,
    Cross2Icon,
    CheckIcon,
    LockClosedIcon,
    UpdateIcon,
    PersonIcon,
} from '@radix-ui/react-icons';

export interface WhitelistAddress {
    address: string;
    addedAt?: number;
}

export interface RoomFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    maxParticipants: string;
    requireApproval: boolean;
}

interface RoomFormProps {
    onSubmit: (formData: RoomFormData, whitelist: WhitelistAddress[]) => Promise<void>;
    loading?: boolean;
    isWalletConnected?: boolean;
}

export function RoomForm({
    onSubmit,
    loading = false,
    isWalletConnected = false,
}: RoomFormProps) {
    // Form state
    const [formData, setFormData] = useState<RoomFormData>({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '60',
        maxParticipants: '10',
        requireApproval: true,
    });

    // Whitelist management
    const [whitelist, setWhitelist] = useState<WhitelistAddress[]>([]);
    const [newAddress, setNewAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    const validateSuiAddress = (address: string): boolean => {
        const cleanAddr = address.trim();
        if (!cleanAddr.startsWith('0x')) {
            setAddressError('Address must start with 0x');
            return false;
        }
        if (cleanAddr.length < 3 || cleanAddr.length > 66) {
            setAddressError('Invalid address length');
            return false;
        }
        if (!/^0x[a-fA-F0-9]+$/.test(cleanAddr)) {
            setAddressError('Address must be hexadecimal');
            return false;
        }
        setAddressError('');
        return true;
    };

    const addToWhitelist = () => {
        const cleanAddr = newAddress.trim();
        if (!validateSuiAddress(cleanAddr)) return;

        if (whitelist.some(item => item.address === cleanAddr)) {
            setAddressError('Address already in whitelist');
            return;
        }

        setWhitelist([...whitelist, { address: cleanAddr, addedAt: Date.now() }]);
        setNewAddress('');
        setAddressError('');
    };

    const removeFromWhitelist = (address: string) => {
        setWhitelist(whitelist.filter(item => item.address !== address));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData, whitelist);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Meeting Details Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <LockClosedIcon className="w-5 h-5 text-blue-500" />
                    Meeting Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meeting Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            placeholder="Team Sync - Q1 Planning"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            placeholder="Brief description of the meeting..."
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Participants *
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={formData.maxParticipants}
                            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            placeholder="10"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum number of participants (1-20)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time *
                            </label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (minutes)
                        </label>
                        <select
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.requireApproval}
                                onChange={(e) => setFormData({ ...formData, requireApproval: e.target.checked })}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                Require host approval for new guests
                            </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-2 ml-7">
                            Guests not on whitelist will wait for your approval
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || whitelist.length === 0 || !isWalletConnected}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <UpdateIcon className="w-4 h-4 animate-spin" />
                                Creating & Sealing...
                            </>
                        ) : (
                            <>
                                <LockClosedIcon className="w-4 h-4" />
                                Create & Seal Invite
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Whitelist Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <PersonIcon className="w-5 h-5 text-cyan-500" />
                    Allow List ({whitelist.length})
                </h2>

                {/* Add Address Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Participant Address
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToWhitelist())}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                            placeholder="0x123abc..."
                        />
                        <button
                            type="button"
                            onClick={addToWhitelist}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                    {addressError && (
                        <p className="text-xs text-red-500 mt-1">{addressError}</p>
                    )}
                </div>

                {/* Whitelist Display */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {whitelist.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <PersonIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No participants yet</p>
                            <p className="text-xs">Add Sui addresses to whitelist</p>
                        </div>
                    ) : (
                        whitelist.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <PersonIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-mono text-gray-700 truncate">
                                        {item.address}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFromWhitelist(item.address)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                >
                                    <Cross2Icon className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {whitelist.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700">
                            <strong>Seal Policy:</strong> Only these addresses can decrypt the invite and join the meeting.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

