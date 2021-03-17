1. [ ] Add Clickable to cards
    * [ ] When click a card, information migrate to the form
    * [ ] When delete the card, information deleted
2. [ ] Create the dependent_variables and conditions
    * [ ] Create a Map { key: card_id, value: Variable() }
    * If add a new variable
        * add the varibale. to dependent or conditions list, update the map.
        * edit the variable. Get variable based on the `card_id`. Submit to update this.
        * delete the variable. Remove the variable from the map. Remove from list.
        * If editing and deleting Variable() (Variable is not reference)