// CustomModal.js
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, content }) => (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <button className="btn btn-success" onClick={onRequestClose}>
            Find Some Solutions &rarr;
        </button>
        <br />
        <div className="row mt-3">
            <div className="offset-0 col-90">
                <h2>
                    My Low Code Cookbook
                </h2>
                <p>
                    This is a personal project, driven by the pain and learnings of my last startup Meenta.io (R.I.P). We were a techstars company from the
                    Boston 2018 program. We ran for six years and executed like crazy. We died when Covid ended. We were not able to pivot out of some of
                    business decisions driven by the pandemic supply chain requirements. As the CTO and Co-founder I was painfully capital efficient.
                </p>
                <p>
                    After exiting, I realized that I wrote code for six years straight. Six years
                    of writing code full time. I realized I could rebuild the entire stack in
                    record time if I changed my mindset: "Code is Capex"
                </p>
                <p>
                    I devolved all the diagnostic workflow features, services and learnings and spent a year researching for alternatives to building in-house.
                    This was a painful learning process! If I had had more context and perspective, while I was in the weeds, I would have made very different decisions.
                    This is core theme of my fractional CTO work.
                </p>
                <p>
                    The long story short, my research results in an Airtable, and that lead to this. This is not a survey of the entire industry. It's not complete.
                    It's my view of a set of technology alernatives. Solutions that might have changes the arc of my startup.
                </p>
                <hr />
                <h3>
                    Primary Criteria: The 'Stack Need'
                </h3>
                <p>
                    This is a larger set of tags that allow for mapping a given solution into larger tech stack. If you think any given solution, its a composite
                    of different technologies that knit together. This is setup to make it easy to abstract the role and provide other related solutions.
                </p>
                <p>
                    For example, show all the 'Authentication' solution. This will yield
                    any solution that solves this problem, in some way or form.
                </p>

                <hr />

                <h3>
                    Secondary Criteria: The 'Type'
                </h3>
                <p>
                    The following are three categories that best group solution types. Another view of the these is as a 'cost' indicator.
                    Code costs more. Code takes longer. Teams are needed to support.
                </p>

                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-primary">
                            <div class="card-header py-3 text-bg-primary border-primary">
                                <h4 class="my-0 fw-normal">"No Code"</h4>
                            </div>
                            <div class="card-body">
                                <p>
                                    This category denotes a solution, pattern or library that offers a pure
                                    no-code experience. If the primary use case is code-less, then it gets this
                                    status, event if other features can utilize some code.
                                </p>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>100% code free solution</li>
                                    <li>Works with other low-code options.</li>
                                    <li>Make Devs mad.</li>
                                    <li>Low switching cost.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">"Low Code"</h4>
                            </div>
                            <div class="card-body">
                                <p>
                                    This category denotes solutions that lower the overall volume of code
                                    in a given solution. So a library like Platformatic, would be a low-code
                                    solution. This is reserved for solutions that need a bit of code to customize
                                    or delivery.
                                </p>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>Some Code required.</li>
                                    <li>Makes developer feel better.</li>
                                    <li>Some switching costs</li>
                                    <li>Feels like Glue Code.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">"Less Code"</h4>
                            </div>
                            <div class="card-body">
                                <p>
                                    This category is for solutions that support or enable
                                    the other two categories. Its a catch all.
                                    A no-code purist will <b>hate</b> these solutions, but these
                                    solutions can help transition a traditional tech team
                                    into new patterns.
                                </p>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>Healthy Code Required</li>
                                    <li>Developers are fine with it</li>
                                    <li>High Switching Cost</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h3>
                    Misc Criteria: Founded, Funding etc.
                </h3>
                <p>
                    I have included a few other facets that I find helpful. When was the company founded. This is helpful in
                    understanding the maturity of a given solution. Funding helps with this understanding. <b>Governance</b> is a new category
                    I am working on, that lets me know if I can expect an impact on my SOC2, can I get a BAA, etc.
                </p>
                <hr />
                <p>
                    Happy to take new entries. Happy to take your ideas. But in this mine, it's solves my <a href="https://github.com/liftoff-app/liftoff/issues/423" target="_blank"><b>tech itch</b></a>.
                </p>
                <hr />
                <p>
                    Good luck and happy hunting. :)
                </p>
                <div className="alertBox">
                    <div className="row">
                        <div className="col-md-2">
                            <img src="https://stephansmith.solutions/assets/clients/stephan-smith-avatar.png" className="img-thumbnail img-fluid avatar-border" kwidth="200" />
                        </div>
                        <div className="col-md-10">
                            <p className="mt-3">
                                Hi, I'm Stephan Smith, a <a href="https://StephanSmith.solutions/what_is_a_fractional_cto">fractional</a> CTO (+CISO). I help CEOs make better technology decisions. I code and
                                think about code, and have found that startups value options for getting <b>perspective</b> and <b>context</b> on
                                they technologies and patterns they use to achieve their revenue goals.
                            </p>
                            <a className="btn btn-outline-dark btn-sm w-sm-100 justify-content" href="https://StephanSmith.solutions/" target="_blank">
                                Learn More..
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
);

export default CustomModal;