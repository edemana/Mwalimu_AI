import React from "react";

// Define a functional component named Questionnaire
const Questionnaire = () => (
    // Main container for the questionnaire
    <main className="questionnaire" id="questionnaire">
        {/* Heading for the questionnaire section */}
        <h2>Questionnaire</h2>
        {/* Form for collecting responses */}
        <form>
            {/* Question 1 */}
            <fieldset>
                <legend>When learning new information, which method do you prefer?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="learningMethod" value="Reading texts or articles" />
                    Reading texts or articles
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="learningMethod" value="Watching videos or demonstrations" />
                    Watching videos or demonstrations
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="learningMethod" value="Listening to lectures or podcasts" />
                    Listening to lectures or podcasts
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="learningMethod" value="Doing hands-on activities or experiments" />
                    Doing hands-on activities or experiments
                </label>
            </fieldset>

            {/* Question 2 */}
            <fieldset>
                <legend>Which type of resources do you find most helpful when studying?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="studyResources" value="Written guides or textbooks" />
                    Written guides or textbooks
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="studyResources" value="Visual aids like charts, diagrams, and videos" />
                    Visual aids like charts, diagrams, and videos
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="studyResources" value="Audio recordings or discussions" />
                    Audio recordings or discussions
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="studyResources" value="Practical exercises or real-world examples" />
                    Practical exercises or real-world examples
                </label>
            </fieldset>

            {/* Question 3 */}
            <fieldset>
                <legend>How do you usually organize your study materials?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="organizationMethod" value="Written notes and summaries" />
                    Written notes and summaries
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="organizationMethod" value="Visual organizers like mind maps or flashcards" />
                    Visual organizers like mind maps or flashcards
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="organizationMethod" value="Recorded audio notes or verbal summaries" />
                    Recorded audio notes or verbal summaries
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="organizationMethod" value="Creating models, prototypes, or practicing tasks" />
                    Creating models, prototypes, or practicing tasks
                </label>
            </fieldset>

            {/* Question 4 */}
            <fieldset>
                <legend>During a class or lecture, what helps you remember the information better?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="memoryAid" value="Taking detailed written notes" />
                    Taking detailed written notes
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="memoryAid" value="Looking at slides, videos, or diagrams" />
                    Looking at slides, videos, or diagrams
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="memoryAid" value="Listening attentively and participating in discussions" />
                    Listening attentively and participating in discussions
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="memoryAid" value="Engaging in group activities or hands-on practice" />
                    Engaging in group activities or hands-on practice
                </label>
            </fieldset>

            {/* Question 5 */}
            <fieldset>
                <legend>When preparing for exams, which technique do you use most often?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="examPreparation" value="Reviewing written notes and textbooks" />
                    Reviewing written notes and textbooks
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="examPreparation" value="Watching review videos or looking at visual aids" />
                    Watching review videos or looking at visual aids
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="examPreparation" value="Listening to recorded lectures or discussing with peers" />
                    Listening to recorded lectures or discussing with peers
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="examPreparation" value="Doing practice tests or applying concepts in exercises" />
                    Doing practice tests or applying concepts in exercises
                </label>
            </fieldset>

            {/* Question 6 */}
            <fieldset>
                <legend>How do you prefer to receive feedback on your assignments?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="feedbackPreference" value="Written comments or notes" />
                    Written comments or notes
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="feedbackPreference" value="Visual feedback with examples or corrections" />
                    Visual feedback with examples or corrections
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="feedbackPreference" value="Verbal feedback in person or via audio recordings" />
                    Verbal feedback in person or via audio recordings
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="feedbackPreference" value="Practical demonstrations or hands-on guidance" />
                    Practical demonstrations or hands-on guidance
                </label>
            </fieldset>

            {/* Question 7 */}
            <fieldset>
                <legend>What type of activities do you enjoy the most during your free time?</legend>
                {/* Option 1 */}
                <label>
                    <input type="checkbox" name="freeTimeActivity" value="Reading books or articles" />
                    Reading books or articles
                </label>
                {/* Option 2 */}
                <label>
                    <input type="checkbox" name="freeTimeActivity" value="Watching movies, videos, or looking at art" />
                    Watching movies, videos, or looking at art
                </label>
                {/* Option 3 */}
                <label>
                    <input type="checkbox" name="freeTimeActivity" value="Listening to music, podcasts, or talking with friends" />
                    Listening to music, podcasts, or talking with friends
                </label>
                {/* Option 4 */}
                <label>
                    <input type="checkbox" name="freeTimeActivity" value="Building, crafting, or playing sports" />
                    Building, crafting, or playing sports
                </label>
            </fieldset>

            {/* Submit button for the form */}
            <button type="submit">Submit</button>
        </form>
    </main>
);

export default Questionnaire;
