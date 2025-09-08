import React, { useState } from "react";

function MainContent() {
    // 1. useState - カウンター機能
    const [count, setCount] = useState(0);

    // 2. useState - メッセージ表示の状態管理
    const [showMessage, setShowMessage] = useState(false);

    // 3. イベントハンドラー - ボタンクリック処理
    const handleGetStarted = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000); // 3秒後に非表示
    };

    return (
        <main className="main-content">
            <section className="hero" id="home">
                <div className="container">
                    <h2 className="hero-title">Welcome to Our Site</h2>
                    <p className="hero-description">
                        This is a simple landing page built with React and Vite.
                    </p>

                    {/* React要素1: useState + イベントハンドラー */}
                    <div className="interactive-section">
                        <button
                            className="cta-button"
                            onClick={handleGetStarted}
                        >
                            Get Started
                        </button>

                        {/* React要素2: 条件付きレンダリング */}
                        {showMessage && (
                            <div className="success-message">
                                🎉 Welcome! Thanks for clicking!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="about" id="about">
                <div className="container">
                    <h3>About Us</h3>
                    <p>
                        We create simple and effective web solutions using
                        modern technologies.
                    </p>

                    {/* React要素3: カウンター機能 */}
                    <div className="counter-section">
                        <h4>Interactive Counter</h4>
                        <div className="counter">
                            <button
                                className="counter-btn"
                                onClick={() => setCount(count - 1)}
                            >
                                -
                            </button>
                            <span className="counter-value">{count}</span>
                            <button
                                className="counter-btn"
                                onClick={() => setCount(count + 1)}
                            >
                                +
                            </button>
                        </div>
                        <p className="counter-text">
                            You've clicked {count} times!
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainContent;
