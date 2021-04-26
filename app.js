   function init_agenda() {
      console.log('---------   Agenda Callback    ---------');

      const added_nodes_callback = (element_array) => {
        setTimeout(() => {
          if (agenda_quiz_game_utils.user_quiz_doc != null) {
            let new_agenda_items;
            if (games_user_data.additionaldata.show_all_quizzes) {
              new_agenda_items = $('.agenda-item-row');
            } else {
              new_agenda_items = $('.agenda-item-row:not(.upNext)');
            }
            $(new_agenda_items).each((index, item) => {
              agenda_quiz_game_utils.process_agenda_item(item, games_user_data);
            });
          } else {
          }
        }, 30);
      };
      const attribute_change_callback = (element_array) => {};
      let add_mutation_observer = () => {
        const targetNode = document.querySelector('.agenda-list');
        const config = { childList: true, subtree: false };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
          // Use traditional 'for loops' for IE 11
          console.log('hello from mutation observer callback');
          for (const mutation of mutationsList) {
            // console.log(
            //   mutation.addedNodes,
            // );
            if (
              mutation.addedNodes.length > 0 &&
              $(mutation.addedNodes[0]).hasClass('day-container')
            ) {
              added_nodes_callback(Array.from(mutation.addedNodes));
            } else if (mutation.type === 'attributes') {
              attribute_change_callback(mutation);
            }
          }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
      };

      $(document).ready(() => {
        add_mutation_observer();
      });
    }

    init_agenda();
