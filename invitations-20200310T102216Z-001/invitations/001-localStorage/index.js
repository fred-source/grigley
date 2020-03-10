// Constructeur d'une instance
// d'objet de Classe Invitation 
// this est impicitement retourné
function Invitation(nom, participation) {
    this.nom = nom
    this.participation = participation
}

// Procédure d'ajout d'une nouvelle invitation
// @param invitationToAdd Un objet de Class Invitation
function addInvitation(invitationToAdd) {
    return invitations.push(invitationToAdd)
}

// Fonction de création d'un élement DOM
// représentant une instance d'Invitation
// @param une Instance de Invitation
// @return un Element (DOM)
function createInvitationElement(invitation) {
    const element = document.createElement('div')

    // lié à bootrap @url https://getbootstrap.com/docs/4.4/components/list-group/
    element.className = "list-group-item"
    element.innerHTML = `<span class="nom">${invitation.nom}</span>
    <span class="participation">${invitation.participation}</span>`

    return element
}

// Procédure : mise à jour de l'affichage 
// de la liste des invitations
function updateListDisplay() {
    const container = document.getElementById('list-container')
    
    // Purger la liste, on suprime firstChild tant qu'il y en a un
    while (container.firstChild) container.removeChild(container.firstChild)

    // Purge : Alternative à tester
    // container.innerHTML = ''

    // Ajouter invitation par inviation des éléments DOM
    for (var i = 0; i < invitations.length; i++) {
        container.appendChild(createInvitationElement(invitations[i]))
    }
}

// Procdédure mise à jour du résumé
function UpdateSummaryDisplay() {

    function getNumberInvit() {
        return invitations.length
    }

    function getMoneyAmount() {
        let amount = 0
        for (let i = 0; i < invitations.length; i++) amount += +invitations[i].participation
        return amount
    }

    const summary = document.querySelector('#summary')
    summary.querySelector('#nbr-invit').innerText = getNumberInvit()
    summary.querySelector('#amount').innerText = getMoneyAmount()
}

// Procédure de sauvegarde de la lise des Invitations
function saveList() {
    // Ici dans le localStorage
    // note : pour pas pas retourner l'information
    // retourner par setItem (pour testé si tout s'est bien passé)
    return window.localStorage.setItem('invits', JSON.stringify(invitations))
}

// Récupérer la sauvegarde des invitations
function restoreList() {
    // on écrase la valeur de invitations par la sauvegarde
    // si sauvegarde renvoie null on place plutôt un tableau vide
    invitations = JSON.parse(window.localStorage.getItem('invits')) || []
}

// Les données, un tableau qui contiendra
// la liste des objet de types Invitations
let invitations = []

// paramètres
let options = {
    autoLoad: false
}

// Assigner les évènements utilisateurs
// une fois la page chargé
document.addEventListener('DOMContentLoaded', function (event) {

    // Déléger la gestion de l'évènement submit du formulaire
    document.forms.namedItem('invitation-create')
        .addEventListener('submit', function (event) {
            // prévenir l'envoi du formulaire, qui le comportement par défaut
            // sans quoi la page entière sera rechargée
            event.preventDefault()

            // variable raccourcie qui renvoie le formulaire
            // qui a été ciblé par l'évènement submit en cours
            const form = event.target

            // Ajout d'une nouvelle invitation
            invitations.push(new Invitation(form.nom.value, form.participation.value))

            // Mise à jour de l'affichage pour refléter les changements de la valeur
            updateListDisplay()
            // Mise à jour résumé
            UpdateSummaryDisplay()
        })

    // bouton sauvegarder
    document.querySelector('#save-btn')
        .addEventListener('click', function (event) { 
            saveList() 
        })

    // bouton charger données
    document.querySelector('#load-btn')
        .addEventListener('click', function(event) {
            restoreList()
            updateListDisplay()
            UpdateSummaryDisplay()
        })
})

// également : charger la sauvegarde et mettre à jour l'affichage
// une fois que la page à été chargée
document.addEventListener('DOMContentLoaded', function (event) {
    if (options.autoLoad) {
        restoreList()
        updateListDisplay()
    }
})