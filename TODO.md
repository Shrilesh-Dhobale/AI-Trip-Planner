# TODO: Fix Days Input Issue

- [x] Make the days input controlled by adding `value={formData.days || ''}` prop
- [x] Modify `handleInputChange` to cap days at 5 if user enters higher number
- [x] Fix validation logic in `onGenerateTrip` to properly check all required fields
- [x] Add `max="5"` attribute to the days input for better UX
