import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import ApiConfig from '../../api/api';
import './WatchProviders.scss';

const WatchProviders = ({ category, id }) => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.getWatchProviders(category, id);
                setProviders(response.results || {});
            } catch (err) {
                console.error('Error fetching watch providers:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && category) {
            fetchProviders();
        }
    }, [category, id]);

    if (loading) {
        return (
            <div className="providers-loading">
                <Spinner animation="border" variant="danger" size="sm" />
            </div>
        );
    }

    if (!providers || (!providers.US && !providers.FLATRATE)) {
        return null;
    }

    const usProviders = providers.US || {};
    const flatrate = usProviders.flatrate || [];
    const rent = usProviders.rent || [];
    const buy = usProviders.buy || [];

    return (
        <div className="watch-providers-section">
            <h2 className="section-title">Where to Watch</h2>
            <div className="providers-content">
                {flatrate.length > 0 && (
                    <div className="provider-group">
                        <h3 className="provider-type">Stream</h3>
                        <div className="providers-list">
                            {flatrate.map((provider) => (
                                <div key={provider.provider_id} className="provider-item">
                                    <img
                                        src={ApiConfig.w500Image(provider.logo_path)}
                                        alt={provider.provider_name}
                                        title={provider.provider_name}
                                    />
                                    <span>{provider.provider_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {rent.length > 0 && (
                    <div className="provider-group">
                        <h3 className="provider-type">Rent</h3>
                        <div className="providers-list">
                            {rent.map((provider) => (
                                <div key={provider.provider_id} className="provider-item">
                                    <img
                                        src={ApiConfig.w500Image(provider.logo_path)}
                                        alt={provider.provider_name}
                                        title={provider.provider_name}
                                    />
                                    <span>{provider.provider_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {buy.length > 0 && (
                    <div className="provider-group">
                        <h3 className="provider-type">Buy</h3>
                        <div className="providers-list">
                            {buy.map((provider) => (
                                <div key={provider.provider_id} className="provider-item">
                                    <img
                                        src={ApiConfig.w500Image(provider.logo_path)}
                                        alt={provider.provider_name}
                                        title={provider.provider_name}
                                    />
                                    <span>{provider.provider_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchProviders;


