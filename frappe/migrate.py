# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals

import frappe
import frappe.translate
import frappe.modules.patch_handler
import frappe.model.sync
from frappe.utils.fixtures import sync_fixtures
from frappe.sessions import clear_global_cache
from frappe.desk.notifications import clear_notifications
from frappe.website import render, router
from frappe.desk.doctype.desktop_icon.desktop_icon import sync_desktop_icons
from frappe.core.doctype.language.language import sync_languages
from frappe.modules.utils import sync_customizations
import frappe.utils.help

def migrate(verbose=True, rebuild_website=False):
	'''Migrate all apps to the latest version, will:

	- run patches
	- sync doctypes (schema)
	- sync fixtures
	- sync desktop icons
	- sync web pages (from /www)'''
	frappe.flags.in_migrate = True
	clear_global_cache()

	# run patches
	frappe.modules.patch_handler.run_all()
	# sync
	frappe.model.sync.sync_all(verbose=verbose)
	frappe.translate.clear_cache()
	sync_fixtures()
	sync_customizations()
	sync_desktop_icons()
	sync_languages()

	frappe.get_doc('Portal Settings', 'Portal Settings').sync_menu()

	# syncs statics
	render.clear_cache()

	# add static pages to global search
	router.sync_global_search()

	#run after_migrate hooks
	for app in frappe.get_installed_apps():
		if app != "App":
			for fn in frappe.get_hooks('after_migrate', app_name=app):
				frappe.get_attr(fn)()

	frappe.db.commit()

	if not frappe.conf.get('global_help_setup'):
		# sync help if not set as global
		frappe.utils.help.sync()

	clear_notifications()

	frappe.publish_realtime("version-update")
	frappe.flags.in_migrate = False
